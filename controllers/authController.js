const { createToken } = require("../middleware/jwt");
const members = require("../models/member.model");
require('dotenv').config();
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRES_IN = process.env.EXPIRES_IN;
class authController {
    register = async (req, res) => {
        const { name, password } = req.body;
        console.log(name, password);
        try {
            const response = await members.create({ name: name, password: password });
            console.log("response: ", response)
            if (response) {
                console.log("Create Successfully!");

                res.status(201).send("Create Successfully!");
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
            const response = await members.findOne({ name: name, password: password });

            if (response) {

                const token = jwt.sign(
                    { id: response._id, name: response.name, isAdmin: response.isAdmin },
                    SECRET_KEY,
                    { expiresIn: EXPIRES_IN }
                );

                console.log("Token: ", token);
                console.log("Login Successfully!");
                res.render(`admin`, {token: token});
                // res.status(200).json({
                //     message: "Login successfully!",
                //     token: token,
                //     member: response,
                //     redirectUrl: "/admin"
                // });

            } else {
                console.log("Login Failed!");
                res.render('login');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred");
        }
    }

}

module.exports = new authController();