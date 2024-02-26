const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authentication');
const {Quiz} = require('../models/quiz');
const {Question} = require('../models/quiz');

router.get('', isAuthenticated, (req, res) => {
    const lang = req.query.lang || 'en';
    res.render('quiz', { lang: lang });
});

router.post('/', async (req, res) => {
    const lang = req.query.lang || 'en';
    const userAnswers = req.body;
    const questionsArray =[];
  
    const questions ={
      q1: "What does the term «HODL» mean in the context of cryptocurrencies?",
      q2: "Which cryptocurrency is known as the «digital gold»?",
      q3: "What is the purpose of a «white paper» in the crypto world?",
      q4: "What is the significance of the Dow Jones Industrial Average (DJIA) in finance?",
      q5: "What is a «bear market»?",
    }

    const options ={
      q1: [
        "a) Hold On for Dear Life",
        "b) High Octane Digital Ledger",
        "c) Hyperlink Object Data Locator"
      ],
      q2: [
        "a) Ethereum",
        "b) Bitcoin",
        "c) Ripple"
      ],
      q3: [
        "a) Technical documentation of a cryptocurrency project",
        "b) Legal contract for crypto transactions",
        "c) Marketing brochure for a crypto exchange"
      ],
      q4: [
        "a) Measures the performance of technology stocks",
        "b) Tracks the overall performance of the stock market",
        "c) Indicates the price of gold"
      ],
      q5: [
        "a) A market with increasing prices",
        "b) A market with decreasing prices",
        "c) A market with stable prices"
      ],
    }

    const correctAnswers = {
      q1: 'a',
      q2: 'b',
      q3: 'a',
      q4: 'b',
      q5: 'b',
    };
    
    const answers = [];

    let i = 0;
    let score = 0;
    for (const question in userAnswers) {
      i+= 1;
        if (userAnswers.hasOwnProperty(question)) {
          const correctAnswer = correctAnswers[question];
          const userAnswer = userAnswers[question];

          if (userAnswer === correctAnswer) {
              score++;
          }

          answers.push({
            i: userAnswer
          })

          questionsArray.push({
              text: questions[question],
              options: options[question],
              correctAnswer: correctAnswer
          });
      }
    }
  
    try {
      const quiz = new Quiz({
          userId: req.session.user._id,
          questions: { ...questionsArray },
          answers: { ...answers},
          score: score.toString()
      });

      const savedQuiz = await quiz.save();
      console.log("Saved Quiz:", savedQuiz);
      res.render('quizScore', { score, lang });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

module.exports = router;