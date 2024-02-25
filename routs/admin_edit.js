const express = require('express');
const router = express.Router();
const Element = require('../models/element');
const {isAuthenticatedAdmin} = require('../middleware/authentication');

router.get('', isAuthenticatedAdmin, async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        const elements = await Element.find();

        res.render('../views/admin_edit.ejs', { elements: elements, lang: lang });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    const lang = req.query.lang || 'en';
    const name = req.body.name;
    const existingElement = await Element.findOne({ name });

    if (existingElement) {
        return res.send('Name is already taken. Please choose another one.');
    } else {
        const url1 = req.body.url1;
        const url2 = req.body.url2;
        const url3 = req.body.url3;
        const description = req.body.description;
        const newElement = new Element({
            url1,
            url2,
            url3,
            name,
            description,
            creationDate: new Date(),
            updateDate: null,
            deletionDate: null
          });

        await newElement.save();

        res.redirect(`admin_edit?lang=${lang}`);
    }
})

router.put('/', async (req, res) => {
    const lang = req.query.lang || 'en';
    const id = req.body.id;
    const name = req.body.name;
    const url1 = req.body.url1;
    const url2 = req.body.url2;
    const url3 = req.body.url3;
    const description = req.body.description;

    const filter = { _id: id };
    const update = {
        url1: url1,
        url2: url2,
        url3: url3,
        name: name,
        description: description,
        updateDate: new Date(),
    };

    try {
        const result = await Element.updateOne(filter, update);
        console.log('Update result:', result);
        if (!result) {
            return res.status(404).json({ error: 'Element not found' });
        }
        res.redirect(`admin_edit?lang=${lang}`);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/', async (req, res) => {
    const lang = req.query.lang || 'en';
    const id = req.body.id;
    const filter = { _id: id };
    const update = {
        deletionDate: new Date()
    };

    try {
        const result = await Element.updateOne(filter, update);
        console.log('Delete result:', result);
        res.redirect(`admin_edit?lang=${lang}`);
    } catch (error) {
        console.error('Error deleting element:', error);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;