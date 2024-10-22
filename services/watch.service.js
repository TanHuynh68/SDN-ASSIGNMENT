const watchModel = require("../models/watch.model");

class watchService {

    getWatchesService = async (req, res, keyword) => {
        try {
            let response;
            if (!keyword) {
                response = await watchModel.find({}).populate('brand') .populate('brand') // Population của brand
                .populate({
                    path: 'comments.author', // Population của author trong comments
                    
                });
            } else {
                const regex = new RegExp(keyword, 'i');
                response = await watchModel.find({ watchName: { $regex: regex } }).populate('brand') .populate('brand') // Population của brand
                .populate({
                    path: 'comments.author', // Population của author trong comments

                });
            }
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    getWatchesByClientService = async (req, res, keyword) => {
        try {
            let response;
            if (!keyword) {
                response = await watchModel.find({ is_delete: false }).populate('brand').populate({
                    path: 'comments.author', // Population của author trong comments
                    
                });;
            } else {
                const regex = new RegExp(keyword, 'i');
                response = await watchModel.find({ watchName: { $regex: regex }, is_delete: false }).populate('brand').populate({
                    path: 'comments.author', // Population của author trong comments
                    
                });;
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
            const response = await watchModel.findOne({ watchName: watchName })
               
            return response
        } catch (error) {
            console.error(error);
        }
    }

    getWatchByIdService = async (req, res, id) => {
        try {
            const response = await watchModel.findById(id)
                .populate('brand')                      // Populating the brand field
                .populate({
                    path: 'comments.author', // Population của author trong comments
                    
                });
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