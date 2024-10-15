var mongoose = require('mongoose')
const Schema = mongoose.Schema;

commentSchema = new Schema({
    rating: { type: Number, min: 1, max: 3, require: true },
    content: { type: String, require: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "member", require: true }
}, { timestamps: true }
)

const commentModel = mongoose.model('comment', commentSchema)
module.exports = {commentModel, commentSchema};