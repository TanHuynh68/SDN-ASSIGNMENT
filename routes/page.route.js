var express = require('express');
const watchController = require('../controllers/watchController');
const { PATH } = require('../const');
var router = express.Router();
const pageController = require('../controllers/pageController');
/* GET home page. */
router.route(PATH.REGISTER).get(pageController.getRegisterPage)

module.exports = router;
