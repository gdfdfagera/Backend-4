const express = require('express');
const router = express.Router();
const axios = require('axios');
const Stock = require('../models/stock');
const { getPrice } = require('../controllers/api');
const { isAuthenticated } = require('../middleware/authentication');

router.get('', isAuthenticated, (req, res) => {
    const lang = req.query.lang || 'en';
    res.render('stock', { symbol: null, price: null, lang: lang });
});

router.post('/', async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        
        const { symbol, price} = await getPrice(req);
        
        if (price){
          const stock = new Stock({
            userId: req.session.user._id,
            symbol: symbol,
            price: price,
          });
          
          await stock.save();
          res.render('stock', { symbol, price, lang });
        }
        else{
          console.error('Ошибка получения данных о факте');
          res.status(500).send('Internal Server Error');
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});


module.exports = router;