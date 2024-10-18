var express = require('express');
const authController = require('../controllers/authController');
const { PATH } = require('../const');
const authMiddleWare = require('../middleware/auth.middleware');
var router = express.Router();

router.route(PATH.REGISTER).post(authMiddleWare.validateRegister, authController.register)
router.route(PATH.LOGIN).post(authMiddleWare.loginValidate, authController.login)
router.route(PATH.LOGOUT).get(authController.logout)

module.exports = router;
