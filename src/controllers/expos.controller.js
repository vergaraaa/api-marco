const exposCtrl = { };

const Expo = require('../models/Expo');

exposCtrl.getExpos = async(req, res) => {
    const expos = await Expo.find();
    res.json(expos);
};

exposCtrl.createExpo = async (req, res) => {
    const newExpo = new Expo(req.body);
    await newExpo.save();
    res.json('expo created');
};

exposCtrl.updateExpo = async (req, res) => {
    await Expo.findByIdAndUpdate(req.params.id, req.body);
    res.json('expo updated');
}

exposCtrl.deleteExpo = async (req, res) => {
    await Expo.findByIdAndDelete(req.params.id);
    res.json("expo deleted");
};

module.exports = exposCtrl;