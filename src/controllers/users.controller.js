const userCtrl = {  };

const jwt = require("jsonwebtoken");
const User = require("../models/User");

userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

userCtrl.createUser = async (req, res) => {
    const emailUser = await User.findOne({ email: req.body.email });
    if(emailUser){
        res.json("email already taken")
    }
    else{
        const newUser = new User (req.body);
        newUser.password = await newUser.encryptPassword(req.body.password);
        await newUser.save()
        res.json("user created");
    }
};

userCtrl.updateUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    req.body.password = await user.encryptPassword(req.body.password);
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.json("user updated");
};

userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json("user deleted");
};

userCtrl.loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if(user){
        const match = await user.matchPassword(req.body.password);
        if (match){
            const token = jwt.sign({email: req.body.email}, "SECRET")
            if (token){
                res.json({ token: token, usertype: user.usertype, success: true })
            } else {
                res.json({message: "Authentication Failed.", success: false})
            }
        }
        else{
            res.json({message: "Incorrect password.", success: false})
        }
    }
    else {
        res.json({message: "Email does not exist.", success: false})
    }
}

module.exports = userCtrl;