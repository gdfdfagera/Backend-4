const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    userId: String,
    name: String,
    image: String,
    height: Number,
    weight: Number,
    abilities: [String],
});


const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;