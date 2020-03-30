import React from 'react';
import './Card.css';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flipped: false
        }
    }

    onClick() {
        if (this.props.auto)
            return;
        this.setState({ flipped: !this.state.flipped });
    }

    render() {
        return (
            <div onClick={this.onClick.bind(this)} className={"card" + (this.props.auto ? ' auto' : this.state.flipped ? ' card-flipped' : '')}>
                <div className="card-body">
                    <div className="card-front">
                        { this.props.front }
                    </div>
                    <div className="card-back">
                        { this.props.back }
                    </div>
                </div>
            </div>
        );
    }
}



export default Card;