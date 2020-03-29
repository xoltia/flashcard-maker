const { Router } = require('express');
const Deck = require('./models/deck');

const api = Router();

api.post('/create-deck', (req, res) => {
    if (!(req.body instanceof Array))
        return res.status(422).send({ error: 'expected array' });
    const deck = new Deck({ cards: req.body });
    deck.validate((error) => {
        if (error)
            return res.status(422).send({ error });
        deck.save((err, doc) => {
            if (err) {
                console.log('error saving deck:', err);
                return res.status(500).send({ error: 'an unexpected error has occurred' });
            }
            return res.status(200).send(doc);
        });
    });
});

api.get('/deck/:id', (req, res) => {
    Deck.findById(req.params.id, (err, doc) => {
        if (err) {
            console.log('error getting deck:', err);
            return res.status(500).send({ error: 'an unexpected error has occurred' });
        }
        return doc ? res.status(200).send(doc) : res.status(404).send({});
    });
});

module.exports = api;