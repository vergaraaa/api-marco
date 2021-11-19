reservationsCtrl = {  };
// sudo lsof -i :10021
const Reservation = require('../models/Reservation');
const User = require('../models/User');

reservationsCtrl.getReservations = async (req, res) => {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    const reservations = await Reservation.find({ date: { $gte: today }}).sort({ date: 'asc', hour: 'asc' });
    res.json(reservations);
}

reservationsCtrl.getReservation = async (req, res) => {
    const reservation = await Reservation.findById(req.params.id);
    res.json(reservation);
}

reservationsCtrl.getAvailableReservations = async (req, res) => {
    console.log(req.params);
    const reservations = await Reservation.find({ available: true , date: req.params.date }).sort({ date: 'asc', hour: 'asc' });
    console.log(reservations);
    res.json(reservations);
}

reservationsCtrl.createReservation = async (req, res) => {
    const reservation = await Reservation.findOne({
        date: req.body.date,
        hour: req.body.hour,
        guide: req.body.guide,
    });
    if(reservation) {
        res.json({message: 'repeated reservation', success: false });
    }
    else{
        req.body.guide._id = req.body.guide._id.toString();
        console.log(req.body);
        const newReservation = new Reservation({
            date: req.body.date,
            hour: req.body.hour,
            guide: {
                name: req.body.guide.name,
                email: req.body.guide.email,
                idGuide: req.body.guide._id.toString()
            }
        });
        console.log(newReservation);
        await newReservation.save();
        res.json({ message: 'Reservation created', success: true });
    }
}

reservationsCtrl.updateReservation = async (req, res) => {
    const reservation = await Reservation.findOne({
        date: req.body.date,
        hour: req.body.hour,
        guide: req.body.guide,
    });
    if(reservation) {
        res.json({message: 'repeated reservation', success: false });
    }
    else{
        await Reservation.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Reservation updated', success: true });
    }
}

reservationsCtrl.deleteReservation = async (req, res) => {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json('Reservation deleted');
}

reservationsCtrl.addReservation = async (req, res) => {
    await Reservation.findByIdAndUpdate(req.params.id, {
        user: req.body.user,
        available: false,
        spots: req.body.spots
    })
    res.json({message: "updated"});
}

reservationsCtrl.getUserReservations = async(req, res) => {
    // console.log(req.params.id);
    const reservations = await Reservation.find({ user: req.params.id }).sort({ date: 'asc', hour: 'asc'});
    // console.log(reservations);
    res.json(reservations);
}

reservationsCtrl.getGuideReservations = async (req, res) => {
    const guide = await User.findById(req.params.id);
    const reservations = await Reservation.find({ 
        date: { $gte: new Date(req.body.from_date).toISOString(), $lt: new Date(req.body.to_date).toISOString() },
        "guide.email": guide.email
    })
    .sort({ date: 'asc', hour: 'asc'});
    console.log(reservations);
    res.json(reservations);
}

module.exports = reservationsCtrl;