import React from 'react';
import classes from './Modal.module.css';

export default function Modal({ setModalVisible }) {
    return (
        <div onClick={() => setModalVisible(false)} className={classes.modal}>
            <div className={classes.modalWindow}>

            </div>
        </div>
    )
}
