const fs = require('fs');
activitiesCtrl = {};

const Activity = require('../models/Activity');

activitiesCtrl.getActivities = async(req, res) => {
    const activities = await Activity.find();
    res.json(activities);
}

activitiesCtrl.getActivity = async(req, res) => {
    const activity = await Activity.findById(req.params.id);
    console.log(activity);
    res.json(activity);
}

activitiesCtrl.getMonthActivities = async(req, res) => {
    const activities = await Activity
        .aggregate([{
            $match: {
                $expr: {
                    $and: [{
                            $eq: [
                                { $month: "$startDate" },
                                { $month: new Date(req.body.month) },

                            ]
                        },
                        {
                            $eq: [
                                { $year: "$startDate" },
                                { $year: new Date(req.body.year) }
                            ]
                        }
                    ]
                }
            }
        }])
        .sort({ startDate: 'asc' });
    res.json(activities);
}

activitiesCtrl.getThisMonthActivities = async(req, res) => {
    var today = new Date();
    today = new Date(today.getFullYear(), today.getMonth());
    var twoMonths = new Date(today.getFullYear(), today.getMonth() + 2);
    const act = await Activity.find({ startDate: { $gte: today, $lte: twoMonths } }).sort({ startDate: 'asc' });
    res.json(act);
}

activitiesCtrl.getNextMonthActivities = async(req, res) => {
    var nextMonth = new Date();
    nextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, nextMonth.getDay());
    const activities = await Activity
        .aggregate([{
            $match: {
                $expr: {
                    $and: [{
                            $eq: [
                                { $month: "$startDate" },
                                { $month: nextMonth },

                            ]
                        },
                        {
                            $eq: [
                                { $year: "$startDate" },
                                { $year: nextMonth }
                            ]
                        },
                    ]
                }
            }
        }])
        .sort({ startDate: 'asc' });
    res.json(activities);
}

activitiesCtrl.createActivity = async(req, res) => {
    var img;
    req.files.forEach(file => {
        img = file.filename;
    });
    req.body.image = "https://admin.marco.org.mx/api/uploads/" + img;
    const newActivity = await new Activity(req.body);
    console.log(req.body);
    await newActivity.save();
    res.json(newActivity);
}

function deleteImage(image) {
    if (image.length) {
        var imageName = image.substring(image.lastIndexOf("/") + 1);
        fs.unlink("src/public/uploads/" + imageName, (err) => {
            if (err) throw err;
            console.log(imageName + ' was deleted');
        });
    }
}

activitiesCtrl.updateActivity = async(req, res) => {
    var img = "";
    const activity = await Activity.findById(req.params.id);
    // Si la imagen es la misma
    if (req.body.coverImage === activity.image) {
        img = req.body.coverImage;
    }
    // Si la imagen no es la misma
    else {
        req.files.forEach(file => {
            img = "https://admin.marco.org.mx/api/uploads/" + file.filename;
        });
        deleteImage(activity.image);
    }

    req.body.image = img;
    console.log(req.body);
    await Activity.findByIdAndUpdate(req.params.id, req.body);
    res.json("activity updated");
}

activitiesCtrl.deleteActivity = async(req, res) => {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    deleteImage(activity.image);
    res.json("expo deleted");
}

module.exports = activitiesCtrl;