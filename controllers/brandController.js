const brandModel = require("../models/brand.model");
const { createBrandService, getBrandService, getBrandsService, getBrandByIdService } = require("../services/brand.services");

class brandController {

    getAllBrand = async (req, res) => {
        try {
            const {keyword} = req.body
            const response = await getBrandsService(req, res, keyword)
            if (response) {
                return res.status(200).json({
                    message: "Get Brands Successfully!",
                    data: response
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error!",
            })
        }

    }

    getBrand = async (req, res) => {
        try {
            const {id} = req.params
            const response = await getBrandByIdService(req, res, id)
            if (response) {
                return res.status(200).json({
                    message: "Get Brands Successfully!",
                    data: response
                })
            }else {
                return res.status(404).json({
                    message: "Brand or Id is not existed!",
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error!",
            })
        }

    }

    createBrand = async (req, res, next) => {
        const { brandName } = req.body;
        if (!brandName) {
            return res.status(400).send("brandName is required!");
        }
        const responseFindOneBrand = await getBrandService(req, res, brandName)
        if (responseFindOneBrand) {
            return res.status(400).json({
                message: "Brand Existed",
                data: responseFindOneBrand
            })

        }
        const response = await createBrandService(req, res, brandName)
        if (response) {
            return res.status(201).json({
                message: "Create New Brand Successfully",
                data: response
            })
        }
    }


}

module.exports = new brandController();
