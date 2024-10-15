var express = require('express');

const { PATH } = require('../const');
const brandController = require('../controllers/brandController');
var router = express.Router();

router.route(PATH.CREATE_BRAND).post(brandController.createBrand)
router.route(PATH.GET_BRAND).get(brandController.getAllBrand)

module.exports = router;
