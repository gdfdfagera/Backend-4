const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


const saltRounds = 10;

router.get('', (req, res) => {
    res.render('registration');
});

router.post('/', async (req, res) => {
    const {username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.send('Username is already taken. Please choose another one.');
    } else {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            password: hashedPassword,
            creationDate: new Date(),
            isAdmin: false,
          });
        await newUser.save();

        req.session.user = newUser;

        res.redirect('login');
    }
});



module.exports = router;