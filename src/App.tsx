import React, {ChangeEvent, ReactElement, useReducer, useState} from 'react';
import './App.css';

enum BabyActivity {
    sleep = "sleep",
    nappy = "nappy",
    cry = "cry",
    feed = "feed",
}

interface Time {
    hour: number,
    minute: number
}

interface Event {
    time: number
    endTime: number
    type: BabyActivity
}

interface ActivityConfig {
    rate: number,
    decay: number
}

interface Config {
    "global": ActivityConfig,
    [BabyActivity.nappy]: ActivityConfig,
    [BabyActivity.cry]: ActivityConfig,
    [BabyActivity.feed]: ActivityConfig,
    // CRY_RATE: number,
    // FEED_RATE: number,
    // NAPPY_RATE: number,
    // CRY_DECAY: number,
    // FEED_DECAY: number,
    // NAPPY_DECAY: number
}

interface ConfigAction {
    action: string;
    type: 'rate' | 'decay';
    activity: BabyActivity.nappy | BabyActivity.cry | BabyActivity.feed | 'global';
    value: number;
}

type Events = Event[];

interface Baby {
    name: string,
    [BabyActivity.nappy]: number,
    [BabyActivity.cry]: number,
    [BabyActivity.feed]: number,
    currentActivity: BabyActivity
}

//
// const RANDOM_RATE = 0.005;
//
// const CRY_RATE = 0.025;
// const FEED_RATE = 0.025;
// const NAPPY_RATE = 0.025;
//
// const CRY_DECAY = 0.25;
// const FEED_DECAY = 0.1666667;
// const NAPPY_DECAY = 1;

const segmentLength = 5;

// how many 5 minutes there are in the day
const TIME_SEGMENTS = (24 * 60) / segmentLength;
// const TIME_SEGMENTS = 25;

const defaultNames = [
    'Horace',
    'Petunia',
    'Gregory',
    'Lilac',
    'Pierre',
    'Shanti'
]

const baby: Baby = {
    name: defaultNames[Math.floor(Math.random() * defaultNames.length)],
    [BabyActivity.cry]: 0,
    [BabyActivity.feed]: 0,
    [BabyActivity.nappy]: 0,
    currentActivity: BabyActivity.sleep
}

function increaseNeed(baseNeed: number, needRate: number, randomRate: number): number {
    return baseNeed + (Math.random() * randomRate) + needRate * segmentLength;
}

function decreaseNeed(baseNeed: number, needRate: number, randomRate: number): number {
    const newNeed = baseNeed - (Math.random() * randomRate) - needRate * segmentLength;
    return newNeed > 0 ? newNeed : 0;
}

function increaseBabyNeeds(baby: Baby, config: Config): Baby {
    // Increase baby state
    const cry = increaseNeed(baby[BabyActivity.cry], config[BabyActivity.cry].rate, config.global.rate)
    const feed = increaseNeed(baby[BabyActivity.feed], config[BabyActivity.feed].rate, config.global.rate)
    const nappy = increaseNeed(baby[BabyActivity.nappy], config[BabyActivity.nappy].rate, config.global.rate)
    return {
        ...baby,
        [BabyActivity.cry]: cry,
        [BabyActivity.feed]: feed,
        [BabyActivity.nappy]: nappy,
    };
}

function reduceBabyNeed(baby: Baby, activity: BabyActivity, config: Config): Baby {
    if (activity === BabyActivity.sleep) {
        return baby;
    }
    const reducedNeed = decreaseNeed(baby[BabyActivity[activity]], config[BabyActivity[activity]].decay, config.global.decay)
    const newActivity = reducedNeed === 0 ? BabyActivity.sleep : activity;

    return {
        ...baby,
        [BabyActivity[activity]]: reducedNeed,
        currentActivity: newActivity
    };

}

function setBabyActivity(baby: Baby, activity: BabyActivity, config: Config): Baby {
    const calmedBaby = reduceBabyNeed(baby, activity, config);
    return {
        ...calmedBaby,
        currentActivity: activity
    };
}

function tick(baby: Baby, config: Config): Baby {
    const {cry, feed, nappy, currentActivity} = baby;

    // If baby is sleeping
    if (
        currentActivity === BabyActivity.sleep
    ) {
        if (
            cry < 1 &&
            feed < 1 &&
            nappy < 1
        ) {
            return increaseBabyNeeds(baby, config);
        }

        // If state is above 1, then set the activity to that thing and reduce activity's score
        if (cry >= 1) {
            return setBabyActivity(baby, BabyActivity.cry, config);
        }
        if (feed >= 1) {
            return setBabyActivity(baby, BabyActivity.feed, config);
        }
        if (nappy >= 1) {
            return setBabyActivity(baby, BabyActivity.nappy, config);
        }
    }

    // If baby is not sleeping, reduce that activity's score
    // If score is equal to 0, baby falls asleep again

    return reduceBabyNeed(baby, baby.currentActivity, config)

}

function buildEvents(baby: Baby, config: Config): Events {
    // return {
    //     events: [
    //         {
    //             time: 123,
    //             type: BabyActivity.cry
    //         }
    //     ]
    // }

    const events = [];
    let segment: number = 0;
    let thisBaby: Baby = baby;
    let lastActivity: BabyActivity = BabyActivity.sleep;

    events.push({
        time: segment,
        type: lastActivity,
        endTime: 0
    })

    while (segment < TIME_SEGMENTS) {
        // console.log(`segment: ${segment}`);
        // console.log(`baby`, JSON.stringify(thisBaby, null, 2));
        thisBaby = tick(thisBaby, config);
        if (thisBaby.currentActivity !== lastActivity) {
            events[events.length - 1].endTime = segment;
            lastActivity = thisBaby.currentActivity;
            events.push({
                time: segment,
                type: thisBaby.currentActivity,
                endTime: segment + 1
            })
        }
        segment = segment + 1
    }

    events[events.length - 1].endTime = segment;

    console.log(events);
    return events;
}

function ConfigRow({name, value, callback}: { name: string, value: number, callback: (event: ChangeEvent<HTMLInputElement>) => void }): ReactElement {
    return (
        <div className="config__item">
            <label htmlFor={name}>{name}</label>
            <input id={name} type="range" min="0" max="1"  step="any" value={value} onChange={callback} data-config={name}/>
            <input type="number" min="0" max="1"  step="0.001" value={value} onChange={callback} data-config={name}/>
        </div>
    )
}

const defaultConfig: Config = {
    global: {
        rate: 0.005,
        decay: 0.005,
    },
    [BabyActivity.cry]: {
        rate: 0.025,
        decay: 0.025,
    },
    [BabyActivity.feed]: {
        rate: 0.025,
        decay: 0.167,
    },
    [BabyActivity.nappy]: {
        rate: 0.025,
        decay: 1,
    },
}

function configReducer(state: Config, {type, value, action, activity}: ConfigAction) {
    const newConfigElement = {
        rate: state[activity].rate,
        decay: state[activity].decay,
    }

    newConfigElement[type] = value;

    switch (action) {
        case 'set':
            return {
                ...state,
                [activity]: newConfigElement,
            }
        default:
            return state;
    }
}

function minutesToHourMins(minutes: number): string {
    const hours = Math.floor(minutes/60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString(10).padStart(2, '0')}`;
}

function EventRow({endTime, type, time}: Event) {
    const timeClock = minutesToHourMins(time * segmentLength);
    const endTimeClick = minutesToHourMins(endTime * segmentLength);
    return (
        <p>From {timeClock} to {endTimeClick} - {type}</p>
    )
}

function buildEventRows({time, endTime, type}: Event) {
    return (<EventRow key={`${time}-${endTime}`} time={time} endTime={endTime} type={type} />)
}

function App() {
    const [config, setConfig] = useReducer(configReducer, defaultConfig);

    function handleConfigChange(event: ChangeEvent<HTMLInputElement>) {
        const value = Number(event.target.value);
        if (isNaN(value)) {
            return;
        }
        const configTarget = event.target.dataset['config'];
        if (!configTarget) {
            return;
        }

        const [activity, type] = configTarget.split('.');

        if (
            activity !== 'global' &&
            activity !== BabyActivity.feed &&
            activity !== BabyActivity.cry &&
            activity !== BabyActivity.nappy
        ) {
            return;
        }

        if (type !== 'rate' && type !== 'decay') {
            return;
        }

        setConfig({
            action: 'set',
            activity: activity,
            type: type,
            value: value
        });
    }

    function buildConfigRow([key, config]: [string, ActivityConfig]): ReactElement {

        return (
            <div key={`${key}`} className="config-row">
                <ConfigRow  name={`${key}.rate`} value={config.rate} callback={handleConfigChange}/>
                <ConfigRow name={`${key}.decay`} value={config.decay}
                           callback={handleConfigChange}/>
            </div>
        )

    }

    function generateEvents() {
        return buildEvents(baby, config);
    }

    const [events, setEvents] = useState(generateEvents);

    function updateEvents() {
        setEvents(generateEvents);
    }

    return (
        <div className="App">
            <h1>Baby Schedule</h1>

            <div className="config">
                {Object.entries(config).map(buildConfigRow)}
                <button onClick={() => updateEvents()}>Rebuild Events</button>
            </div>

            <div className="schedule">
                {events.map(buildEventRows)}
            </div>
        </div>
    )
}

export default App;
