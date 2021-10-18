const { Router } = require('express');
const router = Router();

const { getGuides, createGuide, updateGuide, deleteGuide } = require('../controllers/guides.controller');

router.route('/')
    .get(getGuides)
    .post(createGuide)

router.route('/:id')
    .put(updateGuide)
    .delete(deleteGuide)

module.exports = router;