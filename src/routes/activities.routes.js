const { Router } = require('express');
const router = Router();

const { getActivities, getActivity, createActivity, deleteActivity, updateActivity } = require('../controllers/activities.controller');

router.route('/')
    .get(getActivities)
    .post(createActivity)

router.route('/:id')
    .get(getActivity)
    .put(updateActivity)
    .delete(deleteActivity)

module.exports = router;