import React, { useState } from 'react';
import CalendarGrid from './CalendarGrid';
import Header from './Header';
import classes from './MainContent.module.css';
import moment from 'moment/moment';

export default function MainContent(props) {
    moment.updateLocale('en', { week: { dow: 1 } });
    const [today, setToday] = useState(moment());
    const startDay = today.clone().startOf('month').startOf('week');

    const previous = () => {
        setToday(prev => prev.clone().subtract(1, 'month'));
    }

    const next = () => {
        setToday(prev => prev.clone().add(1, 'month'));
    }
    return (
        <div className={`${classes.mainContent} ${props.startVisible ? '' : classes.mainContentShow}`}>
            <Header previous={previous} next={next} today={today} />
            <CalendarGrid startDay={startDay} today={today} />
        </div>
    )
}
