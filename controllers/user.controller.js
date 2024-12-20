const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({message: 'Please fill all the fields'});
        };
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message: "User is already registered"});
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(201).json({message: "User registered successfully", data: newUser});
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || 'An unexpected error occurred',
        });
    };
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "PLease fill all the fileds"});
        };
        const user = await User.findOne({email});
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({
                id: user._id
            }, process.env.TOKEN, {expiresIn: "1d"});
            user.password = undefined;
            res.status(200).json({message: "User logged in successfully", data: {user, token}});
        } else {
            return res.status(401).json({message: 'User is not authorized'});
        };
    } catch (error) {
        console.error('Error in login user:', error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

module.exports = {registerUser, loginUser};