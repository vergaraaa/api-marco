const { Router } = require('express');
const router = Router();

const { getReservations, createReservation, getAvailableReservations, deleteReservation, updateReservation, getReservation, getUserReservations, addReservation } = require('../controllers/reservations.controllers');

router.route('/')
    .get(getReservations)
    .post(createReservation);

router.route('/:id')
    .get(getReservation)
    .put(updateReservation)
    .delete(deleteReservation);

router.route('/available/:date')
    .get(getAvailableReservations);

router.route('/add/:id')
    .put(addReservation);

router.route('/user/:id')   
    .get(getUserReservations)

module.exports = router;