const mongoose = require('mongoose');
const { Schema } = mongoose;

const Expo = new Schema ({
    name: { type: String, required: true },
    author: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    description: { type: String, required: true },
    virtualTourURL: { type: String, required: true },
    state: { type: String, required: true },
    authorCapsuleURL: { type: String },
    images: [{ type: String }],
    audio: { type: String, required: true },
    curatorship: { type: String, required: true },
    museography: { type: String, required: true },
    location: { type: String, required: true },
    technique: { type: String, required: true },
    totalPieces: { type: String, required: true },
    sponsors: [{ type: String }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Expo', Expo);