const { createToken } = require("../middleware/jwt");
const members = require("../models/member.model");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRES_IN = process.env.EXPIRES_IN;
class authController {
    register = async (req, res) => {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).send("Name and password are required");
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const response = await members.create({ name: name, password: hashedPassword });
            console.log("response: ", response)
            if (response) {
                console.log("Create Successfully!");
                res.status(201).json({
                    message: "Create Successfully!",
                    data: response
                });
            } else {
                console.log("Login Failed!");
                res.status(401).send("Invalid email or password");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred");
        }
    }

    login = async (req, res) => {
        const { name, password } = req.body;
        console.log(name, password);
        try {
            const member = await members.findOne({ name: name });
            if (member) {
                const isMatch = await bcrypt.compare(password, member.password);
                if (isMatch) {
                    const token = jwt.sign(
                        { id: member._id, name: member.name, isAdmin: member.isAdmin },
                        SECRET_KEY,
                        { expiresIn: EXPIRES_IN }
                    );

                    console.log("Login Successfully!");
                    res.cookie('token', token, { httpOnly: true, secure: true });
                    res.redirect(`/admin`);
                } else {
                    console.log("Login Failed: Invalid password");
                    return res.render('login'); // Hoặc bạn có thể sử dụng res.status(401).send("Invalid password");
                }
            } else {
                console.log("User not found!");
                res.render('login');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred");
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