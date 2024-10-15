const brandModel = require("../models/brand.model");

class brandService {

    getBrandsService = async (req, res) => {
        try {
            const response = await brandModel.find({});
            return response
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred");
        }
    }

    createBrandService = async (req, res, brandName) => {
        try {
            const response = await brandModel.create({ brandName: brandName });
            return response
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred");
        }
    }

    findOneBrand = async (req, res, brandName) => {
        try {
            const response = await brandModel.findOne({ brandName: brandName });
            return response
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred");
        }
    }
}

module.exports = new brandService();