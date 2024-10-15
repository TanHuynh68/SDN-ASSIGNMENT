var express = require('express');
const watchController = require('../controllers/watchController');
const validateWatch = require('../middleware/watch.middleware');
var router = express.Router();

router.route("/").post(validateWatch, watchController.createWatch)
    .get(watchController.getWatches)
router.route("/:_id").post(validateWatch, watchController.editWatch)
module.exports = router;
