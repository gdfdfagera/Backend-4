const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const Coin = require('../models/coin');
const Stock = require('../models/stock');
const {isAuthenticated} = require('../middleware/authentication');

router.get('', isAuthenticated, async (req, res) => {
    const lang = req.query.lang || 'en';
    res.render('pdfSave', { lang: lang });
});

router.post('/', async (req, res) => {
    try {
        const stock = await Stock.find({ userId: req.session.user._id }).exec();
        const coin = await Coin.find({ userId: req.session.user._id }).exec();

        const doc = new PDFDocument();
        const fileName = `history-${req.session.user.username}.pdf`;

        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'application/pdf');

        doc.pipe(res);

        doc.fontSize(16).text('Stocks', { align: 'center' });
        stock.forEach((fact) => {
            doc.fontSize(12).text(`Symbol: ${fact.symbol}, Price: ${fact.price}`);
        });

        doc.addPage().fontSize(16).text('Coins', { align: 'center' });
        coin.forEach((co) => {
            doc.fontSize(12).text(`Coin ID: ${co.coinID}, vsCurrency: ${co.vsCurrency}`);
        });

        doc.end();
    } catch (error) {
        console.error('Error generating PDF:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;