var express = require('express');
const authController = require('../controllers/authController');
const { checkToken } = require('../middleware/jwt');
var router = express.Router();

router.route("/register", checkToken).post(authController.register)
router.route("/login", checkToken).post(authController.login)

module.exports = router;
