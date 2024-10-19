const brandModel = require("../models/brand.model");

class brandService {

    getBrandsService = async (req, res, keyword) => {
        try {
            let response;
            if (!keyword) { 
                response = await brandModel.find({});
            } else {
                const regex = new RegExp(keyword, 'i');
                response = await brandModel.find({ brandName: { $regex: regex } });
            }
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    createBrandService = async (req, res, brandName) => {
        try {
            const response = await brandModel.create({ brandName: brandName });
            return response
        } catch (error) {
            console.error(error);
        }
    }

    getBrandService = async (req, res, brandName) => {
        try {
            const response = await brandModel.findOne({ brandName: brandName });
            return response
        } catch (error) {
            console.error(error);
        }
    }

    getBrandByIdService = async (req, res, id) => {
        try {
            const response = await brandModel.findById({ _id: id });
            return response
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new brandService();