const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: [Object],
});

const quiz = new mongoose.Schema({
    userId: String,
    questions: {
        type: Object,
        default: {}
    },
    answers: {
        type: Object,
        default: {}
    },
    score: String
});


const Quiz = mongoose.model('Quiz', quiz);
const Question = mongoose.model('Question', questionSchema);

module.exports = {Quiz, Question};