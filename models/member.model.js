var mongoose = require('mongoose')
const Schema = mongoose.Schema;
const memberSchema = new Schema({
    memberName: { type: String, require: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
    YOB: { type: String, require: true },
    name: { type: String, require: true },
    is_delete: { type: Boolean, require: true, default: false },
    phoneNumber: { type: String, require: true },
},
    { timestamps: true, });

module.exports = mongoose.model('members', memberSchema);