const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    userId: String,
    coinID: String,
    vsCurrency: String,
});


const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;