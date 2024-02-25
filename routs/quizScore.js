const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authentication');

router.get('', isAuthenticated, (req, res) => {
    const score = req.query.score || req.body.score;
    res.render('quizScore', { score });
});

module.exports = router;