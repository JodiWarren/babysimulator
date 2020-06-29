import React, {ReactNode, useState} from 'react';
import logo from './logo.svg';
import './App.css';

enum BabyActivities {
    nappy = "NAPPY",
    sleep = "SLEEP",
    cry = "CRY",
    feed = "FEED",
}

interface Period {
    type: BabyActivities
}

interface Hour {
    periods: [
        Period,
        Period,
        Period,
        Period
    ]
}

interface Day {
    hours: [
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
        Hour,
    ]
}

interface State {
    schedule: Day,
}

function rollDice(): number {
    return Math.ceil(Math.random() * 6);
}

function buildPeriod(): Period {
    switch (rollDice()) {
        case 1:
        case 5: {
            return {
                type: BabyActivities.nappy
            };
        }
        case 2: {
            return {
                type: BabyActivities.sleep
            };
        }
        case 3: {
            return {
                type: BabyActivities.cry
            };
        }
        case 4:
        case 6: {
            return {
                type: BabyActivities.feed
            };
        }
        default: {
            return {
                type: BabyActivities.cry
            };
        }
    }
}

function buildHour(): Hour {
    return {
        periods: [
            buildPeriod(),
            buildPeriod(),
            buildPeriod(),
            buildPeriod(),
        ]
    }
}

function buildDay(): Day {
    return {
        hours: [
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
            buildHour(),
        ]
    }
}

function translateTime(hour: number, minutes: string): string {
    if (hour < 12) {
        return `${hour}:${minutes}AM`
    } else {
        if (hour === 12) {
            return `12:${minutes}PM`
        }
        if (hour === 24) {
            return `12:${minutes}AM`
        }
        return `${hour - 12}:${minutes}PM`
    }
}

function Period(props: Period & { time: string }) {
    return (
        <div className="period">
            <p className="period__time">
                <time>{props.time}</time>
            </p>
            <p className={`babyactivity babyactivity--${props.type.toLowerCase()}`}>{props.type}</p>
        </div>
    )
}

function Hour(props: Hour & { time: number }) {
    const hour = props.time;
    return (
        <div className="hour">
            <Period type={props.periods[0].type} time={translateTime(hour, "00")}/>
            <Period type={props.periods[1].type} time={translateTime(hour, "15")}/>
            <Period type={props.periods[2].type} time={translateTime(hour, "30")}/>
            <Period type={props.periods[3].type} time={translateTime(hour, "45")}/>
        </div>
    )
}

function buildInitialState(): State {
    return {
        schedule: buildDay()
    }
}

function App() {

    const [state, setState] = useState(buildInitialState());

    return (
        <div className="App">
            <h1>Baby Schedule</h1>
            <button onClick={() => setState(buildInitialState())}>Rebuild schedule</button>
            <div className="schedule">
                {state.schedule.hours.map((hour, index) => <Hour key={index} time={index} periods={hour.periods}/>)}
            </div>
        </div>
    );
}

export default App;
