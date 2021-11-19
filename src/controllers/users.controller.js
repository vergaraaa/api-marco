const usersCtrl = {  };

const jwt = require('jsonwebtoken');
const User = require('../models/User');

usersCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

usersCtrl.getUser = async(req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

usersCtrl.getUserName = async(req, res) => {
    const user = await User.findById(req.params.id);
    res.json({name: user.name});
}

usersCtrl.createUser = async (req, res) => {
    const email = await User.findOne({ email: req.body.email });
    if(email){
        res.json({ message: 'Email already taken', success: false })
    }
    else{
        const newUser = new User(req.body);
        newUser.password = await newUser.encryptPassword(req.body.password);
        await newUser.save()
        res.json({ message: 'User created', success: true });
    }
};


usersCtrl.updateUser = async (req, res) => {
    // checar si el usuario por el que quiere cambiar está ocupado
    const user = await User.findById(req.params.id);
    req.body.password = await user.encryptPassword(req.body.password);
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.json("user updated");
};

usersCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json("user deleted");
};

usersCtrl.loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if(user){
        const match = await user.matchPassword(req.body.password);
        if (match){
            const token = jwt.sign({email: req.body.email}, "SECRET", {
                expiresIn: '24h'
            });
            if (token){
                res.json({ 
                    message: "token", 
                    token: token, 
                    id: user._id.toString(), 
                    name: user.name,
                    lastname: user.lastname,
                    usertype: user.usertype, 
                    success: true 
                })
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

usersCtrl.loginAdmin = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if(user){
        if(user.usertype.includes("admin") || 
           user.usertype.includes("collaborator") || 
           user.usertype.includes("guide")){
            const match = await user.matchPassword(req.body.password);
            if (match){
                const token = jwt.sign({email: req.body.email}, "SECRET", {
                    expiresIn: '24h'
                });
                if (token){
                    res.json({ message: "token", token: token, user: user, success: true })
                } else {
                    res.json({message: "Authentication Failed.", success: false})
                }
            }
            else{
                res.json({message: "Incorrect password.", success: false});
            }
        }
        else{
            res.json({message: "You don't have permission to login.", success: false});
        }
    }
    else {
        res.json({message: "Email does not exist.", success: false});
    }
}

usersCtrl.adminToken = async (req, res) => {
    const token = req.headers.auth_key;
    jwt.verify(token, "SECRET", (err, decoded) => {   
        if (err) {
            return res.status(401).json({
                error: err
            }); 
        } 
        else{
            res.json(token);
        }
    });
}

module.exports = usersCtrl;