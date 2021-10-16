collaboratorsCtrl = { };

const User = require('../models/User');

collaboratorsCtrl.getCollaborators = async (req, res) => {
    const collaborators = await User.find({ usertype: "collaborator" });
    res.json(collaborators);
}

module.exports = collaboratorsCtrl;