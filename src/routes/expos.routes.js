const { Router } = require("express");
const router = Router();
const validateToken = require('../helpers/validateToken');

const { getExpos, createExpo, getExpo, updateExpo, deleteExpo, getCurrentExpos, getPastExpos, getUpcomingExpos } = require('../controllers/expos.controller');

router.route('/current/')
    .get(getCurrentExpos)

router.route('/past/')
    .get(getPastExpos)

router.route('/upcoming/')
    .get(getUpcomingExpos)

router.route('/')
    .get(getExpos)
    .post(validateToken, createExpo);

router.route('/:id')
    .get(getExpo)
    .put(validateToken, updateExpo)
    .delete(validateToken, deleteExpo);


module.exports = router;