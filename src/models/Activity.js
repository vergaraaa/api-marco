const mongoose = require('mongoose');
const { Schema } = mongoose;

const Activity = new Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    hour: { type: String, required: true },
    location: { type: String, required: true },
    organizer: { type: String, required: true },
    paidActivity: { type: Boolean, required: true },
    urlTickets: { type: String, default: "empty" }
}, {
    timestamps: true
});

module.exports = mongoose.model('Activity', Activity);