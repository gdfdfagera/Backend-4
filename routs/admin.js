const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.isAdmin == true){
            next();
        } else {
            res.redirect('/main');
        }
    } else {
        res.redirect('/');
    }
};

router.get('', isAuthenticated, async (req, res) => {
    res.render('../views/admin.ejs', {users: null})
});

router.post('/', async (req, res) => {
    const username = req.body.username;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.send('Username is already taken. Please choose another one.');
    } else {
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const isAdmin = req.body.isAdmin === 'on';
        const newUser = new User({
            username,
            password: hashedPassword,
            creationDate: new Date(),
            updateDate: null,
            deletionDate: null,
            isAdmin: isAdmin,
          });
        await newUser.save();

        res.redirect('admin');
    }
});


module.exports = router;