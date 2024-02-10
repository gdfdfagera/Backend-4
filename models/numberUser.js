const mongoose = require('mongoose');

const numberFactSchema = new mongoose.Schema({
    userId: String,
    input: String,
    output: String,
    timestamp: { type: Date, default: Date.now },
});


const NumberFact = mongoose.model('NumberFact', numberFactSchema);

module.exports = NumberFact;