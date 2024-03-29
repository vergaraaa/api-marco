const fs = require('fs');

const exposCtrl = {};

const Expo = require('../models/Expo');

exposCtrl.getExpos = async(req, res) => {
    const expos = await Expo.find();
    res.json(expos);
};

exposCtrl.createExpo = async(req, res) => {
    console.log('res');
    console.log(req.body);
    const images = [];
    const sponsors = [];
    var audio = "";
    req.files.forEach(file => {
        if (file.mimetype === 'audio/mpeg') {
            audio = "https://admin.marco.org.mx/api/uploads/" + file.filename;
        } else {
            if (!file.originalname.startsWith("sponsor:")) {
                images.push("https://admin.marco.org.mx/api/uploads/" + file.filename);
            } else {
                sponsors.push("https://admin.marco.org.mx/api/uploads/" + file.filename);
            }
        }
    });
    req.body.images = images;
    req.body.audio = audio;
    req.body.sponsors = sponsors;
    const newExpo = await new Expo(req.body);
    console.log(newExpo);
    await newExpo.save();
    res.json(newExpo);
};

exposCtrl.getExpo = async(req, res) => {
    const expo = await Expo.findById(req.params.id);
    res.json(expo);
}

exposCtrl.getCurrentExpos = async(req, res) => {
    const expos = await Expo.find({ state: 'current' });
    // console.log(expos);
    res.json(expos);
}

exposCtrl.getPastExpos = async(req, res) => {
    const expos = await Expo.find({ state: 'past' });
    // console.log(expos);
    res.json(expos);
}

exposCtrl.getUpcomingExpos = async(req, res) => {
    const expos = await Expo.find({ state: 'upcoming' });
    console.log(expos);
    res.json(expos);
}

function deleteImages(images) {
    images.forEach(image => {
        var imageName = image.substring(image.lastIndexOf("/") + 1);
        fs.unlink("src/public/uploads/" + imageName, (err) => {
            if (err) throw err;
            console.log(imageName + ' was deleted');
        });
    });
}

exposCtrl.updateExpo = async(req, res) => {
    if (req.files.length) {
        const expo = await Expo.findById(req.params.id);
        var imagesToKeep = [];
        var imagesToDelete = expo.images;

        // Si el audio es el mismo
        if (req.files[0].mimetype === "audio/mpeg") {
            var audio = "";
            if (req.body.audio === expo.audio) {
                audio = req.body.audio;
            }
            // Si cambió el audio
            else {
                if (req.files) {
                    req.files.forEach(file => {
                        if (file.mimetype === "audio/mpeg") {
                            audio = "https://admin.marco.org.mx/api/uploads/" + file.filename;
                        }
                    });
                    deleteImages([expo.audio]);
                }
            }
            req.body.audio = audio;
        } else {
            // Cuando la imagen de portada es la misma
            if (req.body.coverImage === expo.images[0]) {
                imagesToKeep.push(req.body.coverImage);
                req.files.forEach(file => {
                    imagesToKeep.push("https://admin.marco.org.mx/api/uploads/" + file.filename);
                });
                imagesToDelete.shift();
                deleteImages(imagesToDelete);
            }
            // Cuando la imagen de portada cambia
            else if (req.body.otherImages) {
                // console.log(req.body.otherImages);
                req.files.forEach(file => {
                    imagesToKeep.push("https://admin.marco.org.mx/api/uploads/" + file.filename);
                });
                req.body.otherImages.forEach(image => {
                    imagesToKeep.push(image);
                });
                console.log(imagesToKeep);
                imagesToDelete = imagesToDelete.slice(0, 1);
                console.log(imagesToDelete);
                deleteImages(imagesToDelete);
            }
            // Si todo cambia
            else if (!req.body.coverImage && !req.body.otherImages) {
                req.files.forEach(file => {
                    imagesToKeep.push("https://admin.marco.org.mx/api/uploads/" + file.filename);
                });
                deleteImages(imagesToDelete);
            }
            req.body.images = imagesToKeep;
        }
    }
    await Expo.findByIdAndUpdate(req.params.id, req.body);
    res.json('expo updated');
}

exposCtrl.deleteExpo = async(req, res) => {
    const expo = await Expo.findByIdAndDelete(req.params.id);
    deleteImages(expo.images);
    deleteImages([expo.audio]);
    deleteImages(expo.sponsors);
    res.json("expo deleted");
};

module.exports = exposCtrl;