const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    userId: String,
    symbol: String,
    price: String,
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;