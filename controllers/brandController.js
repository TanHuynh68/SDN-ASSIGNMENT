const brandModel = require("../models/brand.model");
const { createBrandService, findOneBrand, getBrandsService } = require("../services/brand.services");

class brandController {

    getAllBrand= async (req, res) => {
        const response = await getBrandsService(req, res)
        if(response){
            return res.status(200).json({
                message: "Get Brands Successfully!",
                data: response
            })
        }
    }

    createBrand = async (req, res, next) => {
        const { brandName } = req.body;
        if (!brandName) {
            return res.status(400).send("brandName is required!");
        }
        const responseFindOneBrand = await findOneBrand(req, res, brandName)
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
