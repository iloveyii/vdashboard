import {Model} from "react-axiom";
import {CATEGORIES, CONDITIONS, TRIGGER_STATUSES} from "../../Common/constants";
import ScoreIcon from "../Images/ScoreIcon";
import React from "react";

/* #1 - Defaults from constants */
const DEFAULTS = {
    HOME_GOALS: 1,
    AWAY_GOALS: 100,
};
export default class GoalsModel extends Model {
    constructor(props) {
        super(props);
        this.eventStats = { time: 0, score: '0 - 0'};
    }

    set triggerData(trigger) {
        const conditionValue = JSON.parse(trigger.conditionValue);
        const triggerData = {
            categoryId: CATEGORIES.GOALS,
            homeGoals: conditionValue[0].value,
            awayGoals: conditionValue.length === 2 ? conditionValue[1].value : DEFAULTS.AWAY_GOALS,
        };
        this.setState({triggerData});
    }

    get path() {
        return 'goals';
    }

    get title() {
        return 'Goals / Exact score';
    }

    get statsLabel() {
        return this.eventStats.time < 1 ? '' : 'Current goals: ';
    }

    get userValue() {
        return `${this.state.triggerData.homeGoals} - ${this.state.triggerData.awayGoals}`;
    }

    get currentStats() {
        return <span>{this.eventStats ? this.eventStats.score : '...'}</span>
    }

    get isNewRecord() {
        return !!!this.state.triggerData.modelId;
    }

    showUserValues() {
        const styles = {
            label: {
                display: "inline-block",
                width: "100%",
                color: "white",
            },
            info: {
                display: "inline-block",
                width: "100%",
                color: "white",
                fontWeight: "bold"
            }
        }
        const { triggerData } = this.state;
        return <span>
                <span style={styles.label}>{triggerData.label} </span>
                <span style={styles.info}>{triggerData.homeGoals} - {triggerData.awayGoals}</span>
            </span>
    }

    getApiData(eventId) {
        const  conditionValue = `[{"value":${this.state.triggerData.homeGoals}},{"value":${this.state.triggerData.awayGoals}}]`;
        const apiData = {
            eventId: eventId, //4004, 1959
            conditionId: CONDITIONS.SCORE.toString(),
            conditionValue: conditionValue
        };
        return apiData;
    }

    showCurrentValues(eventStats) {
        return <span>{eventStats.score}</span>;
    }

    showIcon() {
        return <ScoreIcon fill="white"/>;
    }

    getPath() {
        return 'goals';
    }

    decreaseValue(team) {
        let { triggerData } = this.state;
        if(team == 'home' && triggerData.homeGoals > 0) {
            triggerData.homeGoals--;
            this.setState({triggerData});
        }

        if(team == 'away' && triggerData.awayGoals > 0) {
            triggerData.awayGoals--;
            this.setState({triggerData});
        }
    }

    increaseValue(team) {
        let { triggerData } = this.state;
        if(team == 'home') {
            triggerData.homeGoals++;
            this.setState({triggerData});
        }

        if(team == 'away') {
            triggerData.awayGoals++;
            this.setState({triggerData});
        }
    }

    setEventStats(eventStats) {
        if( ! eventStats  || ! this.eventStats) return;
        if (eventStats.score != this.eventStats.score) {
            this.eventStats = eventStats;
            return true;
        }
        return false;
    }

    get status() {
        if( ! this.eventStats) return TRIGGER_STATUSES.FALSE;

        const { score } = this.eventStats;
        const aScore = this.eventStats.score ? this.eventStats.score.split('-') : ['0', '0'];

        const currHomeGoals = Number(aScore[0]);
        const currAwayGoals = Number(aScore[1]);

        const userHomeGoals = Number(this.state.triggerData.homeGoals);
        const userAwayGoals =  Number(this.state.triggerData.awayGoals);

        if((currHomeGoals === userHomeGoals ) && (currAwayGoals === userAwayGoals)){
            return TRIGGER_STATUSES.TRUE;
        } else {
            return (currHomeGoals > userHomeGoals || currAwayGoals > userAwayGoals ) ? TRIGGER_STATUSES.IMPOSSIBLE : TRIGGER_STATUSES.FALSE;
        }
    }

    validate() {
        return {
            status: true,
            message: 'OK'
        }
    }

    /**
     * These two functions are for numpad
     */
    get numpadConfig() {
        return {
            row1: {
                message: 'Error message here'
            },
            row2: {
                title: 'Number of goals',
            },
            row3: [
                {
                    label: '+1',
                    value: 1,
                    func: (goals) => Number(goals) + 1
                },
                {
                    label: '+2',
                    value: 2,
                    func: (goals) => Number(goals) + 2
                },
                {
                    label: '+3',
                    value: 3,
                    func: (goals) => Number(goals) + 3
                },
                {
                    label: '+4',
                    value: 4,
                    func: (goals) => Number(goals) + 4
                }
            ],
            row4: {
                buttons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
                controls: ['DEL', 'OK']
            },
        };
    }

    set currentVar(userGoals) {
        this.userVar = userGoals;
    }
}
