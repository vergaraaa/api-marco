activitiesCtrl = { };
const fs = require('fs');

const Activity = require('../models/Activity');

activitiesCtrl.getActivities = async(req, res) => {
    const activities = await Activity.find();
    res.json(activities);
}

activitiesCtrl.getActivity = async(req, res) => {
    const activity = await Activity.findById(req.params.id);
    res.json(activity);
}

activitiesCtrl.createActivity = async(req, res) => {
    console.log(req.files);
    var img;
    req.files.forEach(file => {
        img = file.filename;
    });
    req.body.image = "http://100.24.228.237:10021/uploads/" + img;
    const newActivity = await new Activity(req.body);
    await newActivity.save();
    res.json(newActivity);
}

function deleteImage(image){
    if(image.length){
        var imageName = image.substring(image.lastIndexOf("/")+1);
        fs.unlink("src/public/uploads/" + imageName, (err) => {
            if (err) throw err;
            console.log( imageName + ' was deleted');
        });
    }
}

activitiesCtrl.updateActivity = async (req, res) => {
    var img = "";
    const activity = await Activity.findById(req.params.id);
    // Si la imagen es la misma
    if(req.body.coverImage === activity.image){
        img = req.body.coverImage;
    }
    // Si la imagen no es la misma
    else{
        req.files.forEach(file => {
            img = "http://100.24.228.237:10021/uploads/" + file.filename;
        });
        deleteImage(activity.image);
    }
    req.body.image = img;
    await Activity.findByIdAndUpdate(req.params.id, req.body);
    res.json("activity updated");
}

activitiesCtrl.deleteActivity = async (req, res) => {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    deleteImage(activity.image);
    res.json("expo deleted");
}

module.exports = activitiesCtrl;