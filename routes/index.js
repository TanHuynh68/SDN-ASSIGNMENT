var express = require('express');
const { checkToken } = require('../middleware/jwt.middleware');
const watchController = require('../controllers/watchController');
const { PATH } = require('../const');
const pageController = require('../controllers/pageController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',checkToken, function(req, res, next) {
  res.render('login', { title: 'Login Page' });
});

router.route(PATH.ADMIN_PAGE).get(pageController.getAdminPage)


module.exports = router;
