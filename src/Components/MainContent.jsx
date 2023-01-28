import React, { useState, useEffect } from 'react';
import CalendarGrid from './CalendarGrid';
import Header from './Header';
import classes from './MainContent.module.css';
import moment from 'moment/moment';
import Modal from './Modal';

export default function MainContent(props) {

    const [modalVisible, setModalVisible] = useState(false);

    moment.updateLocale('en', { week: { dow: 1 } });
    const [today, setToday] = useState(() => {
        const todaymoment = moment();
        if (localStorage.getItem('today')) {
            const localStorageToday = JSON.parse(localStorage.getItem('today'));
            todaymoment.set('year', localStorageToday.slice(0, 4));
            todaymoment.set('month', localStorageToday.slice(5, 7) - 1);
        }
        return todaymoment;
    });

    const [eventList, setEventList] = useState(localStorage.getItem('eventList') ? JSON.parse(localStorage.getItem('eventList')) : []);

    useEffect(() => {
        localStorage.setItem('today', JSON.stringify(today));
    }, [today]);

    useEffect(() => {
        localStorage.setItem('eventList', JSON.stringify(eventList));
    }, [eventList]);

    console.log(eventList);
    const startDay = today.clone().startOf('month').startOf('week');
    const [dateFromDatePicker, setDateFromDatePicker] = useState(today.format('YYYY-MM-DD'));
    const setNewDateFromDatePicker = () => {
        setToday(prev => prev.clone().set('year', dateFromDatePicker.slice(0, 4)));
        setToday(prev => prev.clone().set('month', dateFromDatePicker.slice(5, 7) - 1));
    }
    const previous = () => {
        setToday(prev => prev.clone().subtract(1, 'month'));
        if (dateFromDatePicker.slice(4, 8) === '-01-') {
            setDateFromDatePicker(prev => prev.replace(prev.slice(4, 8), '-12-'));
            setDateFromDatePicker(prev => prev.replace(prev.slice(0, 5), `${prev.slice(0, 4) - 1}-`));
        } else if (dateFromDatePicker.slice(4, 8) === '-11-' || dateFromDatePicker.slice(4, 8) === '-12-') {
            setDateFromDatePicker(prev => prev.replace(prev.slice(4, 8), `-${prev.slice(5, 7) - 1}-`));
        } else if (dateFromDatePicker.slice(4, 8) === '-10-') {
            setDateFromDatePicker(prev => prev.replace(prev.slice(4, 8), `-09-`));
        } else {
            setDateFromDatePicker(prev => prev.replace(prev.slice(4, 8), `-0${prev.slice(6, 7) - 1}-`));
        }
    }

    const next = () => {
        setToday(prev => prev.clone().add(1, 'month'));
        if (dateFromDatePicker.slice(4, 8) === '-12-') {
            setDateFromDatePicker(prev => prev.replace(prev.slice(4, 8), '-01-'));
            setDateFromDatePicker(prev => prev.replace(prev.slice(0, 5), `${Number(prev.slice(0, 4)) + 1}-`));
        } else if (dateFromDatePicker.slice(4, 8) === '-09-') {
            setDateFromDatePicker(prev => prev.replace(prev.slice(4, 8), '-10-'));
        } else if (dateFromDatePicker.slice(4, 8) === '-10-' || dateFromDatePicker.slice(4, 8) === '-11-') {
            setDateFromDatePicker(prev => prev.replace(prev.slice(4, 8), `-1${Number(prev.slice(6, 7)) + 1}-`));
        } else {
            setDateFromDatePicker(prev => prev.replace(prev.slice(4, 8), `-0${Number(prev.slice(6, 7)) + 1}-`));
        }
    }

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");


    return (
        <div className={`${classes.mainContent} ${props.startVisible ? '' : classes.mainContentShow}`}>
            <Header
                previous={previous}
                next={next} today={today}
                dateFromDatePicker={dateFromDatePicker}
                setDateFromDatePicker={setDateFromDatePicker}
                setNewDateFromDatePicker={setNewDateFromDatePicker}
                setModalVisible={setModalVisible}
            />
            <CalendarGrid startDay={startDay} today={today} />
            {modalVisible ? <Modal
                setModalVisible={setModalVisible}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
                eventList={eventList}
                setEventList={setEventList}
            />
                : null}
        </div>
    )
}