const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

const clearSessionOnLogin = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        next();
    });
};

router.get('', clearSessionOnLogin, (req, res) => {
    res.render('../views/login.ejs');
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && user.deletionDate != null){
        console.log("This user has been deleted");
        res.render('login');
    }
    else{
        if (user && user.isAdmin && await bcrypt.compare(password, user.password)) {
            req.session.userId = user.userId;
            req.session.user = user;
            res.redirect('/admin');
        }
        else {
            if (user && await bcrypt.compare(password, user.password)) {
                req.session.userId = user.userId;
                req.session.user = user;
                res.redirect('/main');
            } else {
                res.redirect('/registration');
            }
        }
    }
});

module.exports = router;