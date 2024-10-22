var mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {commentSchema} = require("./comment.model");
const slugify = require('slugify');
const watchSchema = new Schema({
    watchName: { type: String, require: true },
    image: { type: String, require: true },
    slug: { type: String, unique: true },
    price: { type: Number, require: true },
    Automatic: { type: Boolean, default: false },
    is_delete: { type: Boolean, default: false },
    watchDescription: { type: String, require: true },
    comments: [commentSchema],
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "brand", require: true },
}, { timestamps: true, });

watchSchema.pre('save', function (next) {
    if (this.isNew) {
      // Tạo slug từ tên sản phẩm
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
  });


module.exports = mongoose.model('watch', watchSchema);
