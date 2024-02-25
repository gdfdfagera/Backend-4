const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {isAuthenticatedAdmin} = require('../middleware/authentication');

router.get('', isAuthenticatedAdmin, async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        const users = await User.find();

        res.render('../views/adminDelete.ejs', { users: users, lang: lang });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    const lang = req.query.lang || 'en';
    const id = req.body.id;
    const filter = { _id: id };
    const update = {
        deletionDate: new Date()
    };

    try {
        const result = await User.updateOne(filter, update);
        console.log('Delete result:', result);
        res.redirect(`/adminDelete?lang=${lang}`);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;