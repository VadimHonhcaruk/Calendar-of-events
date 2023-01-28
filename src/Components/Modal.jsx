import React from 'react';
import classes from './Modal.module.css';

export default function Modal({ setModalVisible, title, setTitle, description, setDescription, date, setDate, time, setTime, eventList, setEventList }) {
    return (
        <div onClick={() => setModalVisible(false)} className={classes.modal}>
            <div className={classes.modalWindow} onClick={(event) => event.stopPropagation()}>
                <div className={classes.addEventHeader}>
                    <div className={classes.addEventTitle}>Add event</div>
                    <div className={classes.addEventClose} onClick={() => setModalVisible(false)}> &#10006;</div>
                </div>
                <div className={classes.addEventCreate}>
                    <label for='title'>Title*</label>
                    <input className={classes.input} type="text" id="title" name="title" required maxLength="30" placeholder="Type title here." value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div className={classes.addEventCreate}>
                    <label for='description'>Description</label>
                    <textarea className={`${classes.input} ${classes.inputDesc}`} type="text-area" id="description" name="description" maxLength="100" value={description} onChange={(event) => setDescription(event.target.value)} />
                </div>
                <div className={classes.addEventCreate}>
                    <label for='title'>Date*</label>
                    <input id="date" name="date" required className={classes.input} type="date" onFocus={e => e.target.blur()} value={date} onChange={(event) => setDate(event.target.value)} />
                </div>
                <div className={classes.addEventCreate}>
                    <label for='title'>Time</label>
                    <input id="time" name="time" className={classes.input} type="time" value={time} onChange={(event) => setTime(event.target.value)} />
                </div>
                <button className={classes.button} onClick={() => {
                    if (title && date) {
                        setEventList([...eventList, { title, description, date, time }]);
                        setTitle('');
                        setDescription('');
                        setDate('');
                        setTime('');
                        setModalVisible(false);
                    }
                }
                }>SAVE</button>
            </div>
        </div>
    )
}
