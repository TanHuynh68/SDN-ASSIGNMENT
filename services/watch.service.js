const watchModel = require("../models/watch.model");

class watchService {

    getWatchesService = async (req, res) => {
        try {
            const response = await watchModel.find({}).populate('brand');
            return response
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred");
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
            res.status(500).send("An error occurred");
        }
    }

    getWatchService = async (req, res, watchName) => {
        try {
            const response = await watchModel.findOne({ watchName: watchName });
            return response
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred");
        }
    }

    editWatchSerVice = async (req, res, _id, watchName, image, price, Automatic, watchDescription, brand) => {
        try {
            const response = await watchModel.findOneAndUpdate({_id}, {
                watchName: watchName, image: image, price: price, Automatic: Automatic,
                watchDescription: watchDescription, brand: brand
            }, { new: true });
            console.log("editWatchSerVice: ", response)
            return response
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred");
        }
    }
}

module.exports = new watchService();