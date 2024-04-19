import React, { useContext, useEffect, useState } from 'react';
import styles from './Calendar.module.css';
import { ActionType, CalendarContext, CalendarProvider } from './Context';

export interface ICalendarEvent {
    start: Date;
    end: Date;
}

export interface ICalendarData {
    date: Date;
    events: ICalendarEvent[];
}

interface ICalendarProps {
    data?: ICalendarData;
    locale?: Locale;
    primaryColor?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    boxShadow?: string;
    defaultMode?: CalendarMode;
}

export enum CalendarMode {
    MONTH = 'month',
    WEEK = 'week',
    DAY = 'day',
}

const Calendar = (props: ICalendarProps) => {
    const { state, dispatch } = useContext(CalendarContext);
    const { date, events } = state;

    useEffect(() => {
        dispatch({ type: ActionType.SET_DATA, data: props.data ?? { date: new Date(), events: [] }});
    }, [props.data])

    const [mode, setMode] = useState(props.defaultMode ?? CalendarMode.MONTH)
    const locale = props.locale ?? Locale.EN;
    const backgroundColor = props.backgroundColor ?? 'white';
    const color = props.primaryColor ?? 'black';

    //Calculate some date stuff
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const monthLength = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const lastMonthLength = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    return (
        <div className={styles.container} style={{
            color: color,
            backgroundColor: backgroundColor,
            border: props.border ?? '1px solid black',
            borderRadius: props.borderRadius ?? '2em',
            boxShadow: props.boxShadow ?? '0 0 10px rgba(0, 0, 0, 0.1)',
        }}>
            {props.data &&
                <>
                <div className={styles.header}>
                    <div className={styles.buttongroup} style={{borderColor: color}}>
                        <button style={{backgroundColor: backgroundColor, color: color}} onClick={() => dispatch({type: ActionType.SET_DATE,date: new Date()})}>{Localization[locale].buttons.today}</button>
                        <button style={{backgroundColor: backgroundColor, color: color}} onClick={() => {
                            switch (mode) {
                                case CalendarMode.MONTH:
                                    dispatch({type: ActionType.SET_MONTH, month: date.getMonth() - 1});
                                    break;
                                case CalendarMode.WEEK:
                                    dispatch({type: ActionType.SET_WEEK, week: date.getDate() - 7});
                                    break;
                                case CalendarMode.DAY:
                                    dispatch({type: ActionType.SET_DAY, day: date.getDate() - 1});
                                    break;
                                default:
                                    break;
                            }
                        }}>-</button>
                        <button style={{backgroundColor: backgroundColor, color: color}} onClick={() => {
                            switch (mode) {
                                case CalendarMode.MONTH:
                                    dispatch({type: ActionType.SET_MONTH, month: date.getMonth() + 1});
                                    break;
                                case CalendarMode.WEEK:
                                    dispatch({type: ActionType.SET_WEEK, week: date.getDate() + 7});
                                    break;
                                case CalendarMode.DAY:
                                    dispatch({type: ActionType.SET_DAY, day: date.getDate() + 1});
                                    break;
                                default:
                                    break;
                            }
                        }}>+</button>
                    </div>
                    <div>{`${Localization[locale].months[date?.getMonth() ?? 0]} ${date?.getFullYear()}`}</div>
                    <div>
                        <button style={{backgroundColor: backgroundColor, color: color}} onClick={() => setMode(CalendarMode.MONTH)}>{Localization[locale].buttons.month}</button>
                        <button style={{backgroundColor: backgroundColor, color: color}} onClick={() => setMode(CalendarMode.WEEK)}>{Localization[locale].buttons.week}</button>
                        <button style={{backgroundColor: backgroundColor, color: color}} onClick={() => setMode(CalendarMode.DAY)}>{Localization[locale].buttons.day}</button>
                    </div>
                </div>
                <div>
                    <table className={styles.table} style={{
                        border: '1px solid black',
                    }}>
                        <thead>
                            <tr>
                                {Localization[locale].days.map((day, index) => (
                                    <th key={index}>{day}</th>
                                ))}
                            </tr>
                        </thead>
                    </table>
                </div>
                </>
                
            }
            {!props.data &&
                <div>
                    <p style={
                        {
                            color: props.primaryColor ?? 'black',
                            fontSize: '2em',
                            fontWeight: 'bold',
                        }
                    }>
                        {Localization[locale].messages.no_data}
                    </p>
                </div>
            }
        </div>
    );
};

const CalendarWrapper : React.FC<ICalendarProps> = (props) => {
    return (
        <CalendarProvider>
            <Calendar {...props} />
        </CalendarProvider>
    );
}

export default CalendarWrapper;


//Localization
export enum Locale {
    EN = 'en',
    CZ = 'cz',
    RU = 'ru',
}

const Localization = {
    [Locale.EN]: {
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        messages: {
            no_data: 'This calendar has no data.',
        },
        buttons: {
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day',
        },
    },
    [Locale.CZ]: {
        days: ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'],
        months: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
        messages: {
            no_data: 'Tento kalendář nemá žádná data.',
        },
        buttons: {
            today: 'Dnes',
            month: 'Měsíc',
            week: 'Týden',
            day: 'Den',
        },
    },
    [Locale.RU]: {
        days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        messages: {
            no_data: 'В этом календаре нет данных.',
        },
        buttons: {
            today: 'Сегодня',
            month: 'Месяц',
            week: 'Неделя',
            day: 'День',
        },
    },
};
