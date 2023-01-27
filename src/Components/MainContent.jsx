import React, { useState, useEffect } from 'react';
import CalendarGrid from './CalendarGrid';
import Header from './Header';
import classes from './MainContent.module.css';
import moment from 'moment/moment';

export default function MainContent(props) {
    moment.updateLocale('en', { week: { dow: 1 } });
    const [today, setToday] = useState(moment());
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
    return (
        <div className={`${classes.mainContent} ${props.startVisible ? '' : classes.mainContentShow}`}>
            <Header previous={previous} next={next} today={today} dateFromDatePicker={dateFromDatePicker} setDateFromDatePicker={setDateFromDatePicker} setNewDateFromDatePicker={setNewDateFromDatePicker} />
            <CalendarGrid startDay={startDay} today={today} />
        </div>
    )
}
