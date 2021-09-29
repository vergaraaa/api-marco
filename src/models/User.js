const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema ({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    usertype: [{ type: String, required: true }]
}, {
    timestamps: true
});

User.methods.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

User.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
} 

module.exports = mongoose.model('User', User);