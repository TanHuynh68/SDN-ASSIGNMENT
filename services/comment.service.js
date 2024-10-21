const commentModel = require("../models/comment.model");


class commentService {
    commentWatchService = async (req, res, watch, rating, author, content) => {
        try {
            watch.comments.push({
                rating: rating,
                author: author,
                content: content
            })
            const updatedWatch = await watch.save();
            return updatedWatch;
        } catch (error) {
            console.log("error: ", error)
        }
    }
}

module.exports = new commentService();