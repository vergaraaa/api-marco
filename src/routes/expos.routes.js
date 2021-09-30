const { Router } = require("express");
const router = Router();

const { getExpos, createExpo, updateExpo, deleteExpo } = require('../controllers/expos.controller');

router.route('/')
    .get(getExpos)
    .post(createExpo)

router.route('/:id')
    .put(updateExpo)
    .delete(deleteExpo)