import React from 'react';
import './App.css';

// From suggestion: https://github.com/Microsoft/TypeScript/issues/26223#issuecomment-622353532

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never
type Tuple<T extends any[]> =
    Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>>
    & { [Symbol.iterator]: () => IterableIterator< ArrayItems<T> > }

type FixedLengthArray<Type, Count extends number> =
    Count extends 1 ? Tuple<[Type]> :
    Count extends 2 ? Tuple<[Type, Type]> :
    Count extends 3 ? Tuple<[Type, Type, Type]> :
    Count extends 4 ? Tuple<[Type, Type, Type, Type]> :
    Count extends 5 ? Tuple<[Type, Type, Type, Type, Type]> :
    Count extends 6 ? Tuple<[Type, Type, Type, Type, Type, Type]> :
    Count extends 7 ? Tuple<[Type, Type, Type, Type, Type, Type, Type]> :
    Count extends 8 ? Tuple<[Type, Type, Type, Type, Type, Type, Type, Type]> :
    Count extends 9 ? Tuple<[Type, Type, Type, Type, Type, Type, Type, Type, Type]> :
    Count extends 10 ? Tuple<[Type, Type, Type, Type, Type, Type, Type, Type, Type, Type]> :
    Count extends 11 ? Tuple<[Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type]> :
    Count extends 12 ? Tuple<[Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type]> :
    Count extends 13 ? Tuple<[Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type]> :
    Count extends 14 ? Tuple<[Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type]> :
    Count extends 15 ? Tuple<[Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type]> :
    Count extends 16 ? Tuple<[Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type]> :
    Count extends 17 ? Tuple<[Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type]> :
    Count extends 18 ? Tuple<[Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type]> :
    Count extends 19 ? Tuple<[Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type]> :
    Count extends 20 ? Tuple<[Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type]> :
    Count extends 21 ? Tuple<[Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type]> :
    Count extends 22 ? Tuple<[Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type]> :
    Count extends 23 ? Tuple<[Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type]> :
    Count extends 24 ? Tuple<[Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type, Type]> :
        never;


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
    periods: FixedLengthArray<Period, 4>
}

interface Day {
    hours: FixedLengthArray<Hour, 24>
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

    const [state, setState] = React.useState(buildInitialState());

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
