const mongoose = require('mongoose');
const { Schema } = mongoose;

const PriceAndMenu = new Schema({
    ticketPriceGeneral: { type: Number, required: true },
    ticketPriceDiscount: { type: Number, required: true },
    urlMenu: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('PriceAndMenu', PriceAndMenu);