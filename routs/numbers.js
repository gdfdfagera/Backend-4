const express = require('express');
const router = express.Router();
const NumberFact = require('../models/numberUser');
const { getNumberFact } = require('../controllers/api');

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.isAdmin != true){
          next();
        } else {
          res.redirect('/admin');
        }
    } else {
        res.redirect('/');
    }
};

router.get('', isAuthenticated, (req, res) => {
    res.render('numbers', { trivia: null });
});

router.post('/', async (req, res) => {
    try {
        const fact = await getNumberFact(req);
        
        
        if (fact){
            const numberFact = new NumberFact({
                userId: req.session.user._id,
                input: req.body.number,
                output: fact,
            });
            
            await numberFact.save();

            res.render('numbers', { trivia: fact });
        }
        else{
            console.error('Ошибка получения данных о факте');
            res.status(500).send('Внутренняя ошибка сервера');
        }
    } catch (error) {
        console.error('Ошибка при получении информации:', error.message);
        res.render('numbers', { trivia: 'Ошибка при получении информации.' });
    }
});


module.exports = router;