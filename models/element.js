const mongoose = require('mongoose');

const element = new mongoose.Schema({
    url1: String,
    url2: String,
    url3: String,
    name: String,
    description: String,
    creationDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: null },
    deletionDate: { type: Date, default: null },
});


const Element = mongoose.model('Elements', element);

module.exports = Element;