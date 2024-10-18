const memberModel = require("../models/member.model");

class authService {
    getMemberService = async (req, res, memberName) => {
        try {
            const response = await memberModel.find({ memberName: memberName });
            return response
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred");
        }
    }
}

module.exports = new authService();