const { Router } = require("express");
const router = Router();

const { getExpos, createExpo, getExpo, updateExpo, deleteExpo, getCurrentExpos, getPastExpos, getUpcomingExpos } = require('../controllers/expos.controller');

router.route('/current/')
    .get(getCurrentExpos)

router.route('/past/')
    .get(getPastExpos)

router.route('/upcoming/')
    .get(getUpcomingExpos)

router.route('/')
    .get(getExpos)
    .post(createExpo);

router.route('/:id')
    .get(getExpo)
    .put(updateExpo)
    .delete(deleteExpo);


module.exports = router;