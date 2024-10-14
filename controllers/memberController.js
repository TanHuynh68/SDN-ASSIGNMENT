const members = require("../models/member.model"); // Không cần destructuring { member }

class userController {
    
    getAllMembers = async (req, res) => {
        try {
            const response = await members.find({});
            console.log("response: ", response)
            if (response) {
                res.status(200).json(response);
            } else {
                console.log("Login Failed!");
                res.status(401).send("Invalid email or password");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred");
        }
    }
}

module.exports = new userController();
