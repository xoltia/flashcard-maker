import React from 'react';
import Navbar from '../components/Navbar'
import DeckDisplay from '../components/DeckDisplay';
import Modal from '../components/Modal';
import './Create.css'

class Create extends React.Component {
    constructor() {
        super();
        this.state = {
            cards: [],
            showModal: true,
            currentCard: {
                front: '',
                back: ''
            },
            saveStatus: 'CLEARED',
            saveUrl: '',
            copied: false
        };
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            currentCard: {
                ...this.state.currentCard,
                [name]: value }
            });
    }

    addCurrent() {
        this.setState({
            cards: this.state.cards.concat(this.state.currentCard),
            currentCard: { front: '', back: '' }
        });
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    save() {
        this.setState({ saveStatus: 'SAVING' });
        fetch('/api/create-deck', {
            method: 'POST',
            body: JSON.stringify(this.state.cards),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status !== 200)
                return this.setState({ saveStatus: 'ERROR' });
            res.json().then(json => {
                let saveUrl = window.location.protocol + '//' + window.location.host + `/${json._id}`;
                return this.setState({ saveStatus: 'SAVED', saveUrl });
            });
        });
    }

    clearSave() {
        this.setState({ saveStatus: 'CLEARED', copied: false });
    }

    copyUrl() {
        const url = document.getElementById('link');
        url.select();
        document.execCommand('copy');
        this.setState({ copied: true });
    }

    render() {
        return (
            <div className="grayish-white" style={{minHeight: '100%'}}>
                <Navbar>
                    <a className="btn" onClick={this.save.bind(this)}>Save</a>
                </Navbar>
                <DeckDisplay auto={true} cards={this.state.cards}/>
                <button onClick={this.toggleModal.bind(this)} id="add-button">
                    <div id="cross"></div>
                </button>
                <Modal active={this.state.showModal}>
                    <h1>New card</h1>
                        <div>
                            <h3>Front</h3>
                            <textarea value={this.state.currentCard.front} onInput={this.handleInputChange.bind(this)} name="front" rows="4" cols="50"></textarea>
                        </div>
                        <div>
                            <h3>Back</h3>
                            <textarea value={this.state.currentCard.back} onInput={this.handleInputChange.bind(this)} name="back" rows="4" cols="50"></textarea>
                        </div>
                        <button onClick={this.addCurrent.bind(this)} className="btn green" style={{marginTop: 5, marginRight: 5}}>Add</button>
                    <button onClick={this.toggleModal.bind(this)} className="btn red" style={{marginTop: 5}}>Close</button>
                </Modal>
                <Modal active={this.state.saveStatus !== 'CLEARED'}>
                    <div style={{textAlign: 'center'}}>
                        {
                            this.state.saveStatus === 'SAVING' ? <div>Saving...</div> :
                            this.state.saveStatus === 'ERROR' ? <div>Error</div> :
                            <div>
                                <input id="link" value={this.state.saveUrl} readOnly></input>
                            </div>
                        }
                        {  
                            this.state.saveStatus === 'SAVED' ?
                            <button onClick={this.copyUrl.bind(this)}
                                    className={"btn" + (this.state.copied ? ' green' : '')}
                                    style={{marginRight: 5}}>{this.state.copied ? 'Copied' : 'Copy'}
                            </button> : null
                        }
                        <button className="btn red" onClick={this.clearSave.bind(this)}>Close</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Create;