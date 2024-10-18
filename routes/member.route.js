var express = require('express');
const memberController = require('../controllers/memberController');
const memberMiddleware = require('../middleware/member.middleware');
const { API_ROUTE } = require('../const');
var router = express.Router();

router.route(API_ROUTE.GET_ALL_MEMBER).post(memberController.getAllMembers)
router.route(API_ROUTE.GET_MEMBER_DETAIL).get(memberMiddleware.validateIdFromParam, memberController.getMemberDetail)
router.route(API_ROUTE.CHANGE_PASSWORD).put(memberMiddleware.changePassword, memberController.changePassword)
router.route(API_ROUTE.DELETE_MEMBER).put(memberMiddleware.banOrUnBanMember, memberController.deleteMember)
router.route(API_ROUTE.RESTORE_MEMBER).put(memberMiddleware.banOrUnBanMember, memberController.restoreMember)

module.exports = router;
