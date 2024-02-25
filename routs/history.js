const express = require('express');
const router = express.Router();
const Stock = require('../models/stock');
const Coin = require('../models/coin');
const {isAuthenticated} = require('../middleware/authentication');


router.get('/', isAuthenticated, async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        const stock = await Stock.find({ userId: req.session.user._id }).exec();
        const coin = await Coin.find({ userId: req.session.user._id }).exec();
        res.render('history', { stock, coin, lang: lang });
    } catch (error) {
      console.error('Error fetching Pokemon information:', error.message);
      res.status(500).send('Internal Server Error');
    }
});



module.exports = router;