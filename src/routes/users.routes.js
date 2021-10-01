const { Router } = require('express');
const router = Router();

const { getUsers, createUser, getUser, updateUser, deleteUser, loginUser } = require('../controllers/users.controller');

router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/login')
    .post(loginUser)


module.exports = router;