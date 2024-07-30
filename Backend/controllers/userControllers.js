const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
    const { email, userName, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({ email,userName, password });
        await user.save();
        const payload = { user: { id: user.id } };
        jwt.sign(payload, 'Workflow', { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); 
            res.json({ token });
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const payload = { user: { id: user.id } };
        jwt.sign(payload, 'Workflow', { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); 
            res.json({ token, user:user });
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
};
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ msg: 'Logged out successfully' });
};
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

