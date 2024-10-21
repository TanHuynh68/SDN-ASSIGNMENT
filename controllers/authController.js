const { createToken } = require("../middleware/jwt.middleware");
const members = require("../models/member.model");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const redis = require('redis');
const showValiDateResult = require("../middleware/showValidateResult");
const { getMemberService } = require("../services/auth.service");
const { generateOTP, sendSMS } = require("../services/sms.service");
const { PATH } = require("../const");
const client = redis.createClient();
const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRES_IN = process.env.EXPIRES_IN;

client.connect()
    .then(() => console.log('Connected to Redis'))
    .catch(err => console.error('Redis connection error:', err));

// Đảm bảo client không bị đóng trước khi sử dụng
client.on('error', (err) => console.error('Redis Client Error', err));
class authController {

    register = async (req, res) => {
        const validationErrors = showValiDateResult(req, res)
        if (validationErrors) return;
        const { memberName, password, name, phoneNumber } = req.body;
        try {
            const isExsistMember = await getMemberService(req, res, memberName)
            if (isExsistMember.length > 0) {
                return res.status(400).json({
                    message: "memberName is Exsisted",
                    data: isExsistMember
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const response = await members.create({ memberName: memberName, password: hashedPassword, name: name });
            console.log("response: ", response)
            if (response) {
                const sendotp =  sendSMS(phoneNumber);
                console.log("sendotp: ", sendotp);
                // res.status(201).json({
                //     message: "Create Account Successfully!",
                //     data: response,
                //     otp: otp,
                //     sendOTP: sendotp
                // });
                return res.redirect("/login")
            } else {
                console.log("Create Failed!");
                res.status(500).send("Internal Server Error");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred");
        }
    }



    login = async (req, res) => {
        const { memberName, password } = req.body;
        const validationErrors = showValiDateResult(req, res)
        if (validationErrors) return;
        try {
            const member = await members.findOne({ memberName: memberName });
            if (member) {
                const isMatch = await bcrypt.compare(password, member.password);
                if (isMatch) {
                    const token = jwt.sign(
                        { id: member._id, name: member.name, isAdmin: member.isAdmin },
                        SECRET_KEY,
                        { expiresIn: parseInt(EXPIRES_IN) }
                    );
                    const dataUser = member._id
                    const accessTokem = `${token}`
                    res.cookie('token', accessTokem, { httpOnly: true, secure: true });
                    res.cookie('dataUser', dataUser, { httpOnly: true, secure: true });
                    res.setHeader('Authorization', `Bearer ${token}`);
                    // return res.status(200).json({
                    //     message: "Login Successfully!",
                    //     token: token,
                    // });
                    console.log("member: ", member)
                    if (member.isAdmin === true) {
                        return res.redirect(PATH.ADMIN_PAGE); // Chuyển hướng đến trang quản trị
                    } else {
                        return res.redirect(PATH.HOME_PAGE); // Chuyển hướng đến trang chính
                    }
    
                } else {
                    console.log("Login Failed: Invalid password");
                    res.status(401).json({ message: "Password Invalid" });
                }
            } else {
                res.status(401).json({ message: "User Not Found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred" });
        }
    }

    logout = (req, res) => {
        const cookies = req.cookies;
        console.log("handle logout")
        for (const cookie in cookies) {
            if (cookies.hasOwnProperty(cookie)) {
                res.clearCookie(cookie);
            }
        }

        res.redirect('/login')
    }
}

module.exports = new authController();