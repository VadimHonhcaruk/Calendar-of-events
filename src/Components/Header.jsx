import React, { useState } from 'react';
import classes from './Header.module.css';
import Modal from './Modal';

export default function Header({ previous, next, today, dateFromDatePicker, setDateFromDatePicker, setNewDateFromDatePicker }) {

    const [modalVisible, setModalVisible] = useState(false);
    return (
        <header className={classes.header}>
            <div className={classes.title}>
                <div className={classes.changer} onClick={previous}>&lt;</div>
                <div className={classes.month}>{today.format('MMMM-YYYY').toUpperCase()}</div>
                <div className={classes.changer} onClick={next}>&gt;</div>
            </div>
            <div className={classes.addEvent}>
                <button type="button" className={classes.button} onClick={(event) => { event.preventDefault(); setModalVisible(true) }}>Add event</button>
            </div>
            <div className={classes.datePicker}>
                <input type="date" value={dateFromDatePicker} onChange={(event) => setDateFromDatePicker(event.target.value)} onFocus={e => e.target.blur()} />
                <button type="button" className={classes.button} onClick={(event) => { event.preventDefault(); setNewDateFromDatePicker() }}>SET</button>
            </div>
            {modalVisible ? <Modal setModalVisible={setModalVisible} /> : null}
        </header>
    )
}
