const mongoose = require('mongoose');
const { Schema } = mongoose;

const Guide = new Schema ({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Guide', Guide);