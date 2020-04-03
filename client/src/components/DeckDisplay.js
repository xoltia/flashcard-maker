import React from 'react';
import Card from './Card';
import './Card.css';

function DeckDisplay({ cards, auto }) {
    return (
        <div className="cards">
            {cards.map((c, i) => <Card auto={auto} key={i} {...c}/>)}
        </div>
    );
}

export default DeckDisplay;