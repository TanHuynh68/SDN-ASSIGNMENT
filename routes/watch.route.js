var express = require('express');
const watchController = require('../controllers/watchController');
const validateWatch = require('../middleware/watch.middleware');
const { API_ROUTE } = require('../const');
var router = express.Router();

router.route(API_ROUTE.CREATE_WATCH).post(validateWatch, watchController.createWatch)
router.route(API_ROUTE.GET_ALL_WATCH).post(watchController.getWatches)
router.route(API_ROUTE.EDIT_WATCH).put(validateWatch, watchController.editWatch)
router.route(API_ROUTE.DELETE_WATCH).put( watchController.deleteWatch)
router.route(API_ROUTE.RESTORE_WATCH).put( watchController.restoreWatch)
router.route(API_ROUTE.GET_WATCH).get( watchController.getWatch)

module.exports = router;
