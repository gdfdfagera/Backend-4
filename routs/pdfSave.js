const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const NumberFact = require('../models/numberUser');
const Pokemon = require('../models/pokemonUser');

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.isAdmin != true){
          next();
        } else {
          res.redirect('/admin');
        }
    } else {
        res.redirect('/');
    }
};

router.get('', isAuthenticated, async (req, res) => {
    res.render('pdfSave');
});

router.post('/', async (req, res) => {
    try {
        const numberFacts = await NumberFact.find({ userId: req.session.user._id }).exec();
        const pokemons = await Pokemon.find({ userId: req.session.user._id }).exec();

        const doc = new PDFDocument();
        const fileName = `history-${req.session.user.username}.pdf`;

        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'application/pdf');

        doc.pipe(res);

        doc.fontSize(16).text('Number Facts', { align: 'center' });
        numberFacts.forEach((fact) => {
            doc.fontSize(12).text(`Input: ${fact.input}, Output: ${fact.output}, Timestamp: ${fact.timestamp}`);
        });

        doc.addPage().fontSize(16).text('Pokemons', { align: 'center' });
        pokemons.forEach((pokemon) => {
            doc.fontSize(12).text(`Name: ${pokemon.name}, Height: ${pokemon.height}, Weight: ${pokemon.weight}`);
            doc.fontSize(10).text(`Abilities: ${pokemon.abilities.join(', ')}`);
        });

        doc.end();
    } catch (error) {
        console.error('Error generating PDF:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;