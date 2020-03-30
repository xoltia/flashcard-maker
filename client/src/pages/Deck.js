import React from 'react';
import DeckDisplay from '../components/DeckDisplay';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cards: [] };
    }

    componentDidMount() {
        fetch(`/api/deck${this.props.location.pathname}`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({ cards: json.cards })
            });
    }

    render() {
        return (
            <div className="grayish-white" style={{minHeight: '100%'}}>
                <Navbar>
                    <Link to="/create" className="btn">Create</Link>
                </Navbar>
                <DeckDisplay auto={false} cards={this.state.cards}/>
            </div>
        );
    }
}

export default Deck;