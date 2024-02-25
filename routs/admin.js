const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {isAuthenticatedAdmin} = require('../middleware/authentication');

router.get('', isAuthenticatedAdmin, async (req, res) => {
    const lang = req.query.lang || 'en';
    res.render('../views/admin.ejs', {users: null, lang: lang})
});

router.post('/', async (req, res) => {
    const lang = req.query.lang || 'en';
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

        res.redirect(`admin?lang=${lang}`);
    }
});


module.exports = router;