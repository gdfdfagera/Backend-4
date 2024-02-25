const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {clearSessionOnLogin} = require('../middleware/authentication');
const bcrypt = require('bcrypt');


router.get('', clearSessionOnLogin, (req, res) => {
    const lang = req.query.lang || 'en';
    res.render('login', {lang: lang});
});

router.post('/', async (req, res) => {
    const lang = req.query.lang || 'en';
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && user.deletionDate != null){
        console.log("This user has been deleted");
        res.render(`login?lang=${lang}`);
    }
    else{
        if (user && user.isAdmin && await bcrypt.compare(password, user.password)) {
            req.session.userId = user.userId;
            req.session.user = user;
            res.redirect(`admin?lang=${lang}`);
        }
        else {
            if (user && await bcrypt.compare(password, user.password)) {
                req.session.userId = user.userId;
                req.session.user = user;
                res.redirect(`/coin?lang=${lang}`);
            } else {
                res.redirect(`/registration?lang=${lang}`);
            }
        }
    }
});

module.exports = router;