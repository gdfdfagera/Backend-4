const express = require('express');
const router = express.Router();
const Coin = require('../models/coin');
const { getStockPrice } = require('../controllers/api');
const {isAuthenticated} = require('../middleware/authentication');

router.get('', isAuthenticated, async (req, res) => {
    const lang = req.query.lang || 'en';
    res.render('coin', {coin: null, vsCurrency: null, coinId: null, lang: lang });
});

router.post('/', async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        const response = await getStockPrice(req);


        if (response){
          const coin = new Coin({
            userId: req.session.user._id,
            coinID: req.body.coinId,
            vsCurrency: response.data[coinId][vsCurrency],
          });
        
          await coin.save();
          res.render('coin', {coin: response.data, vsCurrency: vsCurrency, coinId: coinId, lang: lang});
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