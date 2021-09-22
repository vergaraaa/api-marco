const { Router } = require("express");
const router = Router();

const { getUsers, createUser, updateUser, deleteUser, loginUser } = require("../controllers/users.controller");

router.route("/")
    .get(getUsers)
    .post(createUser)

router.route("/:id")
    .put(updateUser)
    .delete(deleteUser)

router.route("/login")
    .post(loginUser)


module.exports = router;