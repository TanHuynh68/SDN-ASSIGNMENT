var mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {commentSchema} = require("./comment.model");
const slugify = require('slugify');
const watchSchema = new Schema({
    watchName: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: Number, require: true },
    Automatic: { type: Boolean, default: false },
    is_delete: { type: Boolean, default: false },
    watchDescription: { type: String, require: true },
    comments: [commentSchema],
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "brand", require: true },
}, { timestamps: true, });




module.exports = mongoose.model('watch', watchSchema);
