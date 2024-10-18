const memberModel = require("../models/member.model");

class memberService {
    getMembersService = async (req, res, keyword) => {
        try {
            let response;
            if (!keyword) {  // Nếu keyword là rỗng hoặc không được cung cấp
                response = await memberModel.find({});
            } else {
                // Tìm các memberName chứa keyword bằng Regular Expression
                const regex = new RegExp(keyword, 'i'); // 'i' cho phép tìm kiếm không phân biệt chữ hoa/thường
                response = await memberModel.find({ memberName: { $regex: regex } });
            }
            return response;
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred");
        }
    }

    getMemberDetailService = async (req, res, id) => {
        try {
            const response = await memberModel.findOne({ _id: id });
            if (response)
                return response;
        } catch (error) {
            return undefined;
        }
    }

    changePasswordService = async (req, res, id, hashedPassword) => {
        try {
            const response = await memberModel.findByIdAndUpdate(id, { $set: { password: hashedPassword }})
            console.log("changePasswordService: ", response)
            if (response)
                return response;
        } catch (error) {
            console.log("error: ", error)
        }
    }

    banOrUnBandMemberService = async (req, res, id, is_delete) => {
        try {
            const response = await memberModel.findByIdAndUpdate(id, { $set: { is_delete: is_delete }})
            if (response)
                return response;
        } catch (error) {
            console.log("error: ", error)
        }
    }
}

module.exports = new memberService();
