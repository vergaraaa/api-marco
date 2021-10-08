const { dirname } = require("path");
const path = require("path");

const exposCtrl = { };

const Expo = require('../models/Expo');

exposCtrl.getExpos = async(req, res) => {
    const expos = await Expo.find();
    res.json(expos);
};

exposCtrl.createExpo = async (req, res) => {
    const images = [];
    req.files.forEach(file => {
        // images.push("localhost:3000/" + file.filename);
        images.push("https://api-marco.herokuapp.com/" + file.filename);
    });
    req.body.images = images;
    const newExpo = new Expo(req.body);
    await newExpo.save();
    console.log(newExpo);
    res.json(newExpo);
};

exposCtrl.getExpo = async(req, res) => {
    const expo = await Expo.findById(req.params.id);
    res.json(expo);
}

exposCtrl.updateExpo = async (req, res) => {
    await Expo.findByIdAndUpdate(req.params.id, req.body);
    res.json('expo updated');
}

exposCtrl.deleteExpo = async (req, res) => {
    await Expo.findByIdAndDelete(req.params.id);
    res.json("expo deleted");
};

module.exports = exposCtrl;