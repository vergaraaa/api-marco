const { Router } = require('express');
const router = Router();

const { getActivities, getActivity, createActivity, deleteActivity, updateActivity, getMonthActivities, getNextMonthActivities } = require('../controllers/activities.controller');

router.route('/')
    .get(getActivities)
    .post(createActivity);

router.route('/month')
    .get(getMonthActivities);

router.route('/nextMonth')
    .get(getNextMonthActivities);

router.route('/:id')
    .get(getActivity)
    .put(updateActivity)
    .delete(deleteActivity);


module.exports = router;