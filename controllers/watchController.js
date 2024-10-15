const { getWatchesService, createWatchService, getWatchService, editWatchSerVice } = require("../services/watch.service");
const { validationResult } = require('express-validator');


class brandController {

    getWatches = async (req, res) => {
        const response = await getWatchesService(req, res)
        if (response) {
            return res.status(200).json({
                message: "Get Watches Successfully!",
                data: response
            })
        }
    }

    createWatch = async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation errors",
                errors: errors.array().map(err => ({
                    field: err.param,
                    message: err.msg
                }))
            });
        }
        const { watchName, image, price, Automatic, watchDescription, brand } = req.body;
        const responseFindOneWatch = await getWatchService(req, res, watchName)
        if (responseFindOneWatch) {
            return res.status(400).json({
                message: "Watch Existed",
                data: responseFindOneWatch
            })

        }
        const response = await createWatchService(req, res, watchName, image, price, Automatic, watchDescription, brand)
        if (response) {
            return res.status(201).json({
                message: "Create New Watch Successfully",
                data: response
            })
        }
    }

    editWatch = async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation errors",
                errors: errors.array().map(err => ({
                    field: err.param,
                    message: err.msg
                }))
            });
        }
        const { _id } = req.params
        console.log("_id: ", _id)
        const { watchName, image, price, Automatic, watchDescription, brand } = req.body;
        const response = await editWatchSerVice( req, res, _id, watchName, image, price, Automatic, watchDescription, brand)
        if (response) {
            return res.status(200).json({
                message: "Edit Watch Successfully",
                data: response
            })
        }
    }
}

module.exports = new brandController();
