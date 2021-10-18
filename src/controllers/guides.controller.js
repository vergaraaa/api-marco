const guidesCtrl = { };

const Guide = require('../models/Guide');

guidesCtrl.getGuides = async (req, res) => {
    const guides = await Guide.find();
    res.json(guides);
}

guidesCtrl.createGuide = async (req, res) => {
    const email = await Guide.findOne({ email: req.body.email });
    if(email){
        res.json({ message: 'Email already taken', success: false })
    }
    else{
        const newGuide = new Guide(req.body);
        await newGuide.save()
        res.json({ message: 'Guide created', success: true });
    }
}

guidesCtrl.updateGuide = async (req, res) => {
    await Guide.findByIdAndUpdate(req, params.id, req.body);
    res.json("guide updated");
}

guidesCtrl.deleteGuide = async (req, res) => {
    await Guide.findByIdAndDelete(req.params.id);
    res.json("guide deleted");
}

module.exports = guidesCtrl;