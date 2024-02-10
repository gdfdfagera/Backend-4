const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemonUser');
const { getSpecialPokemon } = require('../controllers/api');

const isAuthenticated = (req, res, next) => {
    if (req.session.user && req.session.user._id) {
        if (req.session.user.isAdmin != true){
          next();
        } else {
          res.redirect('/admin');
        }
    } else {
        res.redirect('/');
    }
};

router.get('', isAuthenticated, async (req, res) => {
    res.render('findPokemon', {pokemon: null});
});


router.post('/', async (req, res) => {
    try {
        if (req.body.name == null){
            res.render('findPokemon', {pokemon: null});
        }
        else {
            const { pokemon } = await getSpecialPokemon(req);
    
            const newPokemon = new Pokemon({
                userId: req.session.user._id,
                name: pokemon.name,
                image: pokemon.image,
                height: pokemon.height,
                weight: pokemon.weight,
                abilities: pokemon.abilities || [],
            });

            await newPokemon.save();

            res.render('findPokemon', { pokemon });
        }
    } catch (error) {
        console.error('Error rendering findPokemon page:', error);
        res.render('findPokemon', { pokemon: null });
    }
});


module.exports = router;