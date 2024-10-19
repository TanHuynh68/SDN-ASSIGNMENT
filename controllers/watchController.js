const showValiDateResult = require("../middleware/showValidateResult");
const { getWatchesService, createWatchService, editWatchSerVice, deleteOrResotreService, getWatchByNameService,
    getWatchByIdService } = require("../services/watch.service");
const { validationResult } = require('express-validator');


class brandController {

    getWatches = async (req, res) => {
        const {keyword} = req.body
        try {
            const response = await getWatchesService(req, res, keyword)
            if (response) {
                return res.status(200).json({
                    message: "Get Watches Successfully!",
                    data: response
                })
            }
        } catch (error) {
            console.log("getWatches-error: ", error)
            return res.status(500).json({
                message: "Internal Server Error",
            })
        }
    }

    getWatch = async (req, res) => {
        const { id } = req.params
        try {
            const response = await getWatchByIdService(req, res, id)
            if (response) {
                return res.status(200).json({
                    message: "Get Watch Successfully!",
                    data: response
                })
            } else if (response === undefined) {
                return res.status(404).json({
                    message: "Watch not found or id is not exsist!",
                });
            }
        } catch (error) {
            console.log("getWatch-error: ", error)
            return res.status(500).json({
                message: "Internal Server Error",
            })
        }
    }

    createWatch = async (req, res, next) => {
        try {
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
            const responseFindOneWatch = await getWatchByNameService(req, res, watchName)
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
        } catch (error) {
            console.log("createWatch-error: ", error)
            return res.status(500).json({
                message: "Internal Server Error",
            })
        }
    }

    editWatch = async (req, res, next) => {
        try {
            const validationErrors = showValiDateResult(req, res)
            if (validationErrors) return;
            const { id } = req.params
            const { watchName, image, price, Automatic, watchDescription, brand } = req.body;
            const response = await editWatchSerVice(req, res, id, watchName, image, price, Automatic, watchDescription, brand)
            if (response) {
                return res.status(200).json({
                    message: "Edit Watch Successfully",
                    data: response
                })
            } else if (response === undefined || response === null) {
                return res.status(404).json({
                    message: "Watch not found or id is not exsist!",
                });
            }
        } catch (error) {
            console.log("editWatch-error: ", error)
            return res.status(500).json({
                message: "Internal Server Error",
            })
        }
    }

    deleteWatch = async (req, res) => {
        try {
            const { id } = req.params
            const response = await deleteOrResotreService(req, res, id, true);
            console.log("response: ", response)
            if (response) {
                res.status(200).json({
                    message: "Delete Watch Successfully",
                    data: response
                });
            } else {
                return res.status(404).json({
                    message: "User not found or id is not exsist!",
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred",
            });
        }
    }

    restoreWatch = async (req, res) => {
        try {
            const { id } = req.params
            const response = await deleteOrResotreService(req, res, id, false);
            console.log("response: ", response)
            if (response) {
                res.status(200).json({
                    message: "Delete Watch Successfully",
                    data: response
                });
            } else {
                return res.status(404).json({
                    message: "User not found or id is not exsist!",
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred",
            });
        }
    }
}

module.exports = new brandController();
