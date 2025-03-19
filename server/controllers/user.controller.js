const User = require("../models/user.model");

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try{
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({ message: "User already exists" });

        await User.create({ username, email, password });
        return res.status(201).json({ message: "User created successfully" });
    } catch(error){
        return res.status(500).json({ message: error.message });
    }
}

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        const token = await User.matchPasswordAndGenerateToken(email, password);

        return res.cookie("token", token).status(200).json({
            message: "User signed in successfully",
            token,
            user: req.user
        })
    } catch(error){
        return res.status(500).json({ message: error.message });
    }
}

exports.signout = async (req, res) => {
    try{
        res.clearCookie("token");
        return res.status(200).json({ message: "User signed out successfully" });
    }
    catch(error){
        return res.status(500).json({ message: error.message });
    }
}

exports.getuser = async (req, res) => {
    try{
        return res.status(200).json({ user: req.user });
        } catch(error){
        }
}