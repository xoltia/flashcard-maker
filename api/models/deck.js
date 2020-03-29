const { Schema, model } = require('mongoose');
const shortid = require('shortid');

const cardText = {
    type: String,
    min: [1, 'cannot have empty card text'],
    max: [200, 'cannot have over 200 characters per card side'],
    required: [true, 'must provide card text for both sides']
}

const deck = Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
    },
    cards: {
        type: [{
            front: cardText,
            back: cardText,
        }],
        validate: [
            {
                validator: (array) => array.length > 0,
                msg: 'deck cannot be empty'
            },
            {
                validator: (array) => array.length <= 500,
                msg: 'cannot have over 500 cards'
            }
        ]
    }
});

module.exports = model('Deck', deck);
