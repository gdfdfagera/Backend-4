const express = require('express');
const router = express.Router();
const { getPokemons } = require('../controllers/api');

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
      const result = await getPokemons(req);
      
      if (result && result.pokemonDataArray && result.pokemonDataArray.length > 0) {
        res.render('main', { pockemon: result.pokemonDataArray, currentPage: parseInt(result.page), totalPages: 10 });
      }
      else {
        console.error('Ошибка получения данных о покемонах');
        res.status(500).send('Внутренняя ошибка сервера');
      }
    } catch (error) {
      console.error('Error fetching Pokemon information:', error.message);
      res.status(500).send('Internal Server Error');
    }
});


module.exports = router;