import React from 'react';
import classes from './Start.module.css';

export default function Start(props) {
    return (
        <div className={classes.start}>
            <div>
                <div>
                    <span className={classes.startButton} onClick={() => { props.setStartVisible(!props.startVisible) }}>START</span>
                    <br />
                    <span className={classes.startDescription}>Test task.</span>
                    <br />
                    <span className={classes.startDescription}>Calendar of events.</span>
                </div>
            </div>
        </div>
    )
}
