var express = require('express');
const userController = require('../controllers/memberController');
var router = express.Router();

/* GET users listing. */
router.route("/").get(userController.getAllMembers)

module.exports = router;
