const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config(); // Ensure dotenv is required

const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(422).json({ error: "Invalid username or password" });
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
        return res.status(422).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token to the client
    res.json({ token });
}

module.exports = login;