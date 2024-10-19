var express = require('express');

const { PATH, API_ROUTE } = require('../const');
const brandController = require('../controllers/brandController');
var router = express.Router();

router.route(API_ROUTE.CREATE_BRAND).post(brandController.createBrand)
router.route(API_ROUTE.GET_ALL_BRANDS).post(brandController.getAllBrand)
router.route(API_ROUTE.GET_BRAND).get(brandController.getBrand)

module.exports = router;
