const { Router } = require('express');
const router = Router();
const validateToken = require('../helpers/validateToken');

const { getActivities, getActivity, createActivity, deleteActivity, updateActivity, getThisMonthActivities, getMonthActivities, getNextMonthActivities } = require('../controllers/activities.controller');

router.route('/')
    .get(getActivities)
    .post(validateToken, createActivity);

router.route('/month')
    .get(getThisMonthActivities)
    .post(getMonthActivities);

router.route('/nextMonth')
    .get(getNextMonthActivities);

router.route('/:id')
    .get(getActivity)
    .put(validateToken, updateActivity)
    .delete(validateToken, deleteActivity);


module.exports = router;