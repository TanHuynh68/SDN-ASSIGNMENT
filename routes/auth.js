var express = require('express');
const authController = require('../controllers/authController');
const { PATH, API_ROUTE } = require('../const');
const authMiddleWare = require('../middleware/auth.middleware');
const jwtMiddleware = require('../middleware/jwt.middleware');
var router = express.Router();

router.route(API_ROUTE.REGISTER).post(authMiddleWare.validateRegister, authController.register)
router.route(API_ROUTE.LOGIN).post( authMiddleWare.loginValidate, authController.login)
router.route(PATH.LOGOUT).get(authController.logout)

module.exports = router;
