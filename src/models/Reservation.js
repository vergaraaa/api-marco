const mongoose = require('mongoose');
const { Schema } = mongoose;

const Reservation = new Schema ({
    date: { type: Date, required: true },
    hour: { type: String, required: true },
    guide: { type: {
        id: { type: String },
        name: { type: String },
        email: { type: String }
    }, required: true },
    user: { type: String, default: 'No user yet' },
    spots: { type: Number, default: 0 },
    available: { type: Boolean, required: true, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Reservation', Reservation);