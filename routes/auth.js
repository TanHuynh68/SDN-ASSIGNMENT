var express = require('express');
const authController = require('../controllers/authController');
const { PATH } = require('../const');
var router = express.Router();

router.route(PATH.REGISTER).post(authController.register)
router.route(PATH.LOGIN).post(authController.login)
router.route(PATH.LOGOUT).get(authController.logout)

module.exports = router;
