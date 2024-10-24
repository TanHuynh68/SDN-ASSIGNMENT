var express = require('express');
const watchController = require('../controllers/watchController');
const validateWatch = require('../middleware/watch.middleware');
const { API_ROUTE } = require('../const');
const jwtMiddleware = require('../middleware/jwt.middleware');
var router = express.Router();

router.route(API_ROUTE.CREATE_WATCH).post(jwtMiddleware.authenticateToken, jwtMiddleware.isAdmin, validateWatch, watchController.createWatch)
router.route(API_ROUTE.GET_ALL_WATCH).post(jwtMiddleware.authenticateToken, jwtMiddleware.isAdmin, watchController.getWatches)
router.route(API_ROUTE.GET_ALL_WATCH_BY_CLIENT).post(watchController.getWatchesByClient)
router.route(API_ROUTE.EDIT_WATCH).put(jwtMiddleware.authenticateToken, jwtMiddleware.isAdmin, validateWatch, watchController.editWatch)
router.route(API_ROUTE.DELETE_WATCH).put(jwtMiddleware.authenticateToken, jwtMiddleware.isAdmin, watchController.deleteWatch)
router.route(API_ROUTE.RESTORE_WATCH).put(jwtMiddleware.authenticateToken, jwtMiddleware.isAdmin, watchController.restoreWatch)
router.route(API_ROUTE.GET_WATCH).get(watchController.getWatch)

module.exports = router;
