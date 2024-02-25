const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authentication');

router.get('', isAuthenticated, (req, res) => {
    const lang = req.query.lang || 'en';
    res.render('quiz', { lang: lang });
});

router.post('/', (req, res) => {
    const userAnswers = req.body;
  
    const correctAnswers = {
      q1: 'a',
      q2: 'b',
      q3: 'a',
      q4: 'b',
      q5: 'b',
    };
  
    let score = 0;
    for (const question in userAnswers) {
      if (userAnswers.hasOwnProperty(question) && userAnswers[question] === correctAnswers[question]) {
        score++;
      }
    }
  
    res.render('quizScore', { score });
});

// router.post('/quizscore', (req, res) => {
//     const userAnswers = req.body;
  
//     const correctAnswers = {
//       q1: 'a',
//       q2: 'b',
//       q3: 'a',
//       q4: 'b',
//       q5: 'b',
//     };
  
//     let score = 0;
//     for (const question in userAnswers) {
//       if (userAnswers.hasOwnProperty(question) && userAnswers[question] === correctAnswers[question]) {
//         score++;
//       }
//     }
  
//     res.json({ score });
// });


module.exports = router;