import moment from 'moment';
import React from 'react';
import classes from './Modal.module.css';

export default function Modal({ setModalVisible, title, setTitle, description, setDescription, date, setDate, time, setTime, eventList, setEventList, editing, currentEvent }) {
    return (
        <div onClick={() => { setModalVisible(false); if (editing) { setTitle(''); setDescription(''); setDate(''); setTime(''); } }} className={classes.modal}>
            <div className={classes.modalWindow} onClick={(event) => event.stopPropagation()}>
                <div className={classes.addEventHeader}>
                    <div className={classes.addEventTitle}>{editing ? 'Edit event' : 'Add event'}</div>
                    <div className={classes.addEventClose} onClick={() => { setModalVisible(false); if (editing) { setTitle(''); setDescription(''); setDate(''); setTime(''); } }}> &#10006;</div>
                </div>
                {editing ? <div className={classes.timing}>
                    <p>Created at: {currentEvent.createTime}</p>
                    {currentEvent.lastEditTime ? <p>Updated at: {currentEvent.lastEditTime}</p> : null}
                </div> : null}
                <div className={classes.addEventCreate}>
                    <label htmlFor='title'>Title*</label>
                    <input className={classes.input} type="text" id="title" name="title" required maxLength="20" placeholder="Type title here." value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div className={classes.addEventCreate}>
                    <label htmlFor='description'>Description</label>
                    <textarea className={`${classes.input} ${classes.inputDesc}`} type="text-area" id="description" name="description" maxLength="100" value={description} onChange={(event) => setDescription(event.target.value)} />
                </div>
                <div className={classes.addEventCreate}>
                    <label htmlFor='title'>Date*</label>
                    <input id="date" name="date" required className={classes.input} type="date" onFocus={e => e.target.blur()} value={date} onChange={(event) => setDate(event.target.value)} />
                </div>
                <div className={classes.addEventCreate}>
                    <label htmlFor='title'>Time</label>
                    <input id="time" name="time" className={classes.input} type="time" value={time} onChange={(event) => setTime(event.target.value)} />
                </div>
                {!editing ? <button className={classes.button} onClick={() => {
                    if (title && date) {
                        setEventList([...eventList, { title, description, date, time, createTime: moment().format('MMMM Do YYYY, h:mm'), lastEditTime: null }]);
                        setTitle('');
                        setDescription('');
                        setDate('');
                        setTime('');
                        setModalVisible(false);
                    }
                }
                }>CREATE</button> : null}
                {editing ? <button className={classes.button} onClick={() => {
                    if (title && date) {
                        currentEvent.title = title;
                        currentEvent.description = description;
                        currentEvent.date = date;
                        currentEvent.time = time;
                        currentEvent.lastEditTime = moment().format('MMMM Do YYYY, h:mm');
                        setEventList([...eventList]);
                        setTitle('');
                        setDescription('');
                        setDate('');
                        setTime('');
                        setModalVisible(false);
                    }
                }
                }>SAVE</button> : null}

                {editing ? <button className={`${classes.button} ${classes.buttonDel}`} onClick={() => {
                    eventList.splice(eventList.indexOf(currentEvent), 1);
                    setEventList([...eventList]);
                    setModalVisible(false);
                }
                }>DELETE</button> : null}
            </div>
        </div>
    )
}
