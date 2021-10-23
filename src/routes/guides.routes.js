const { Router } = require('express');
const router = Router();

const { getGuides, getGuide, createGuide, updateGuide, deleteGuide } = require('../controllers/guides.controller');

router.route('/')
    .get(getGuides)
    .post(createGuide);

router.route('/:id')
    .get(getGuide)
    .put(updateGuide)
    .delete(deleteGuide);

module.exports = router;