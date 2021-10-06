const { Router } = require("express");
const router = Router();

const { getExpos, createExpo, getExpo, updateExpo, deleteExpo } = require('../controllers/expos.controller');

router.route('/')
    .get(getExpos)
    .post(createExpo)

router.route('/:id')
    .get(getExpo)
    .put(updateExpo)
    .delete(deleteExpo)

module.exports = router;