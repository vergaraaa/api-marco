const guidesCtrl = { };

const User = require('../models/User');

guidesCtrl.getGuides = async (req, res) => {
    const guides = await User.find({ usertype: "guide" });
    res.json(guides);
}

// guidesCtrl.getGuide = async (req, res) => {
//     const guide = await User.findById(req.params.id);
//     res.json(guide);
// } //

// guidesCtrl.createGuide = async (req, res) => {
//     const email = await Guide.findOne({ email: req.body.email });
//     if(email){
//         res.json({ message: 'Email already taken', success: false })
//     }
//     else{
//         const newGuide = new Guide(req.body);
//         await newGuide.save()
//         res.json({ message: 'Guide created', success: true });
//     }
// } //

// guidesCtrl.updateGuide = async (req, res) => {
//     await Guide.findByIdAndUpdate(req.params.id, req.body);
//     res.json("guide updated");
// } //

// guidesCtrl.deleteGuide = async (req, res) => {
//     await Guide.findByIdAndDelete(req.params.id);
//     res.json("guide deleted");
// } //

module.exports = guidesCtrl;