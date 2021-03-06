const { Router } = require('express');
const router = Router();

const { getUsers, createUser, getUser, updateUser, deleteUser, loginUser, loginAdmin, getUserName, adminToken } = require('../controllers/users.controller');

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/name/:id')
    .get(getUserName);

router.route('/login/')
    .post(loginUser);

router.route('/login/admin/')
    .post(loginAdmin);

router.route('/admin/validateToken/')
    .get(adminToken);


module.exports = router;