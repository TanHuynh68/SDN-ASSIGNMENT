var express = require('express');
const watchController = require('../controllers/watchController');
const { PATH } = require('../const');
var router = express.Router();
const pageController = require('../controllers/pageController');
const jwtMiddleware = require('../middleware/jwt.middleware');
/* GET home page. */
router.route(PATH.LOGIN_PAGE).get(pageController.getLoginPage)
router.route(PATH.REGISTER).get(pageController.getRegisterPage)
router.route(PATH.HOME_PAGE).get( pageController.getHomePage)
router.route(PATH.CLIENT_WATCH_DETAIL).get(pageController.getWatchDetailPage)
router.route(PATH.ADMIN_PAGE).get(pageController.getAdminPage)
router.route("/logout").get(pageController.getLogout)
router.route("/admin/brand").get(pageController.getAdminBrandPage)
module.exports = router;
 