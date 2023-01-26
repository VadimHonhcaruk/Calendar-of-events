import React from 'react';
import classes from './MainContent.module.css';

export default function MainContent(props) {
    return (
        <div className={`${classes.mainContent} ${props.startVisible ? '' : classes.mainContentShow}`}>

        </div>
    )
}
