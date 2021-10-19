const { Router } = require("express");
const router = Router();

const { getCollaborators } = require('../controllers/collaborators.controller');

router.route('/')
    .get(getCollaborators);


    module.exports = router;