const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authentication');

router.get('', isAuthenticated, (req, res) => {
    const lang = req.query.lang || 'en';
    const score = req.query.score || req.body.score;
    res.render('quizScore', { score, lang });
});

module.exports = router;