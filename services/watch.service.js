const watchModel = require("../models/watch.model");

class watchService {

    getWatchesService = async (req, res, keyword) => {
        try {
            let response;
            if (!keyword) {
                response = await watchModel.find({}).populate('brand');
            } else {
                const regex = new RegExp(keyword, 'i');
                response = await watchModel.find({ watchName: { $regex: regex } }).populate('brand');
            }
            return response;
        } catch (error) {
            console.error(error);
        }
    }


    createWatchService = async (req, res, watchName, image, price, Automatic, watchDescription, brand) => {
        try {
            const response = await watchModel.create({
                watchName: watchName, image: image, price: price, Automatic: Automatic,
                watchDescription: watchDescription, brand: brand
            });
            return response
        } catch (error) {
            console.error(error);
        }
    }

    getWatchByNameService = async (req, res, watchName) => {
        try {
            const response = await watchModel.findOne({ watchName: watchName });
            return response
        } catch (error) {
            console.error(error);
        }
    }

    getWatchByIdService = async (req, res, id) => {
        try {
            const response = await watchModel.findById({ _id: id });
            return response
        } catch (error) {
            console.error(error);
        }
    }

    editWatchSerVice = async (req, res, id, watchName, image, price, Automatic, watchDescription, brand) => {
        try {
            const response = await watchModel.findOneAndUpdate({ _id: id }, {
                watchName: watchName, image: image, price: price, Automatic: Automatic,
                watchDescription: watchDescription, brand: brand
            }, { new: true });
            return response
        } catch (error) {
            console.error(error);
        }
    }

    deleteOrResotreService = async (req, res, id, is_delete) => {
        try {
            const response = await watchModel.findByIdAndUpdate(id, { $set: { is_delete: is_delete } }, { new: true })
            console.log("deleteOrResotreService: ", response)
            if (response)
                return response;
        } catch (error) {
            console.log("error: ", error)
        }
    }
}

module.exports = new watchService();