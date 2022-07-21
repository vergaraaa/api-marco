const { Router } = require('express');
const router = Router();
const validateToken = require('../helpers/validateToken');

const { getReservations, createReservation, getAvailableReservations, deleteReservation, updateReservation, getReservation, getUserReservations, addReservation, getGuideReservations } = require('../controllers/reservations.controllers');

router.route('/')
    .get(getReservations)
    .post(validateToken, createReservation);

router.route('/:id')
    .get(getReservation)
    .put(validateToken, updateReservation)
    .delete(validateToken, deleteReservation);

router.route('/available/:date')
    .get(getAvailableReservations);

router.route('/add/:id')
    .put(validateToken, addReservation);

router.route('/user/:id')
    .get(getUserReservations)
    .post(getGuideReservations);

module.exports = router;