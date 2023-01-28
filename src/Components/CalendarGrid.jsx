import moment from 'moment';
import React from 'react';
import classes from './CalendarGrid.module.css'

export default function CalendarGrid({ setTitle, setDescription, setDate, setTime, startDay, today, eventsList, setCurrentEvent, setModalVisible, setEditing }) {
    const day = startDay.clone().subtract(1, 'day');
    const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone());
    const isCurrentDay = (day) => moment().isSame(day, 'day');
    const isCurrentMonth = (day) => today.isSame(day, 'month');
    return (
        <div className={classes.calendarGrid}>
            {daysArray.map((dayItem) =>
                <div key={dayItem.unix()} className={`${classes.cell} ${isCurrentDay(dayItem) ? classes.cellCurrentDay : null} ${isCurrentMonth(dayItem) ? '' : classes.cellNotCurrentMonth}`}>
                    <div className={classes.cellHeader}>
                        <div>{dayItem.format('D')}</div>
                        <div>{dayItem.format('dd')}</div>
                    </div>
                    <div className={classes.eventsList}>
                        {eventsList.filter(event => event.date === dayItem.format('YYYY-MM-DD')).map((event, index) => (
                            <div key={index} className={classes.event} onClick={() => {
                                setCurrentEvent(event);
                                setTitle(event.title);
                                setDescription(event.description);
                                setDate(event.date);
                                setTime(event.time);
                                setEditing(true);
                                setModalVisible(true);
                            }}>
                                {event.title.toUpperCase()}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
