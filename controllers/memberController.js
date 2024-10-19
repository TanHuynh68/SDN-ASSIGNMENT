const showValiDateResult = require("../middleware/showValidateResult");
const members = require("../models/member.model"); // Không cần destructuring { member }
const { getMembersService, getMemberDetailService, changePasswordService, banOrUnBandMemberService, editMemberService } = require("../services/member.service");
const bcrypt = require('bcrypt');
const { getWatchByIdService } = require("../services/watch.service");
const MESSAGE = require("../const/message");
const { commentWatchService } = require("../services/comment.service");
class memberController {
    getAllMembers = async (req, res) => {
        try {
            const { keyword } = req.body
            const response = await getMembersService(req, res, keyword);
            if (response) {
                res.status(200).json({
                    message: "Get Members Successfully!",
                    data: response
                });
            } else {
                return res.status(500).json({
                    message: "An error occurred",
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred",
            });
        }
    }

    getMemberDetail = async (req, res) => {
        try {
            const validationErrors = showValiDateResult(req, res)
            if (validationErrors) return;
            const { id } = req.params;
            const response = await getMemberDetailService(req, res, id);
            console.log("res: ", response)
            if (response) {
                res.status(200).json({
                    message: "Get Member Detail Successfully!",
                    data: response
                });
            } else if (response === undefined) {
                return res.status(404).json({
                    message: "User not found or id is not exsist!",
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred",
            });
        }
    }

    changePassword = async (req, res) => {
        try {
            const validationErrors = showValiDateResult(req, res)
            if (validationErrors) return;
            const { id, password } = req.body
            const hashedPassword = await bcrypt.hash(password, 10);
            const response = await changePasswordService(req, res, id, hashedPassword);
            console.log("response: ", response)
            if (response) {
                res.status(200).json({
                    message: "Change Password Successfully",
                    data: response
                });
            } else {
                return res.status(404).json({
                    message: "User not found or id is not exsist!",
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred",
            });
        }
    }

    deleteMember = async (req, res) => {
        try {
            const { id } = req.params
            const response = await banOrUnBandMemberService(req, res, id, true);
            console.log("response: ", response)
            if (response) {
                res.status(200).json({
                    message: "Delete Successfully",
                    data: response
                });
            } else {
                return res.status(404).json({
                    message: "User not found or id is not exsist!",
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred",
            });
        }
    }

    restoreMember = async (req, res) => {
        try {
            const { id } = req.params
            const response = await banOrUnBandMemberService(req, res, id, false);
            console.log("response: ", response)
            if (response) {
                res.status(200).json({
                    message: "Restore Successfully",
                    data: response
                });
            } else {
                return res.status(404).json({
                    message: "User not found or id is not exsist!",
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred",
            });
        }
    }

    editMember = async (req, res) => {
        try {
            const validationErrors = showValiDateResult(req, res)
            if (validationErrors) return;
            const { id } = req.params
            const { phoneNumber, name, YOB } = req.body;
            const response = await editMemberService(req, res, id, phoneNumber, name, YOB);
            if (response) {
                res.status(200).json({
                    message: "Edit Member Successfully!",
                    data: response
                });
            } else {
                return res.status(404).json({
                    message: "User not found or id is not exsist!",
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred",
            });
        }
    }

    commentWatch = async (req, res) => {
        try {
            const validationErrors = showValiDateResult(req, res)
            if (validationErrors) return;
            const { id } = req.params
            const { rating, content, author } = req.body;
            const response = await getWatchByIdService(req, res, id);
            if (!response) {
                return res.status(404).json({
                    message: MESSAGE.WATCH_NOT_FOUND,
                });
            }
            const member = await getMemberDetailService(req, res, author);
            if (!member) {
                return res.status(404).json({
                    message: MESSAGE.MEMBER_NOT_FOUND,
                });
            }
            const comment = await commentWatchService(req, res, response, rating, member, content)
            return res.status(201).json({
                message: MESSAGE.ADD_COMMENT_SUCCESSFULLY,
                data: comment
            });
        } catch (error) {
            return res.status(500).json({
                message: MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

}

module.exports = new memberController();
