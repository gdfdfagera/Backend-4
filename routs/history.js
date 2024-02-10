const express = require('express');
const router = express.Router();
const NumberFact = require('../models/numberUser');
const Pokemon = require('../models/pokemonUser');

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

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const numberFacts = await NumberFact.find({ userId: req.session.user._id }).exec();
        const pokemons = await Pokemon.find({ userId: req.session.user._id }).exec();
        res.render('history', { numberFacts, pokemons });
    } catch (error) {
      console.error('Error fetching Pokemon information:', error.message);
      res.status(500).send('Internal Server Error');
    }
});



module.exports = router;