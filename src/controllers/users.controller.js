const userCtrl = {  };

const jwt = require("jsonwebtoken");
const User = require("../models/User");

userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

userCtrl.createUser = async (req, res) => {
    const newUser = new User (req.body);
    newUser.password = await newUser.encryptPassword(req.body.password);
    await newUser.save()
    res.json("user created");
};

userCtrl.updateUser = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.json("user updated");
};

userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json("user deleted");
};

userCtrl.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username: username}); // cambiar por email

    if (user){
        const match = await user.matchPassword(password);
        if (match){
            const token = jwt.sign({username: username}, "SECRET")
            if (token){
                res.json({token: token})
            } else {
                res.json({message: "Authentication Failed", success: false})
            }
        }
        else{
            res.json({message: "Authentication Failed", success: false})
        }
    }
    else {
        res.json({message: "Authentication Failed", success: false})
    }
}

module.exports = userCtrl;