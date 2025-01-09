const User = require('../models/usermodels');

exports.createUsers = async(req, res)=>{
    try{
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json(newUser);

    }catch(err){
        res.status(500).send('server error..', err);
    }
};

exports.getUsers = async(req, res)=>{
    try{
        const users = await User.find();
        res.json(users);

    }catch(err){
        res.status(500).send('server error..', err);
    }
};

exports.updateUsers = async (req, res)=>{
    try{
        const users = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!users) return res.status(404).json({msg:'User not find'});
        res.json(users);

    }catch(err){
        res.status(500).send('server error...',err);
    }
};

exports.deleteUsers = async(req, res)=>{
    try{
        const users = await User.findByIdAndDelete(req.params.id);
        if(!users) return res.status(404).json({msg:'User not foud'});
        res.json({msg:'User Deleted..'});

    }catch(err)
    {
        res.status(500).send('server error..',err)
    }
};