const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(422).json({ error: "Please fill all the fields" });
        }

        if (await User.findOne({ email: email })) {
            return res.status(422).json({ error: "User already exists with this email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashPassword
        });
        await user.save();
        res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred during the signup process" });
    }
}

module.exports = signup;
