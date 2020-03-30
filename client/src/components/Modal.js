import React from 'react';
import './Modal.css';

function Modal({ active, children }) {
    return (
        <div className={"modal-background" + (active ? '' : ' hidden')}>
            <div className="modal">
                {children}
            </div>
        </div>
    );
}

export default Modal;