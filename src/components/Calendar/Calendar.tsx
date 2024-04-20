import React, { useContext, useEffect, useState } from 'react';
import styles from './Calendar.module.css';
import { ActionType, CalendarContext, CalendarProvider } from './Context';
import {Button,ButtonGroup} from './Buttons';
import { Locale, Localization } from './Localization';
import { DateIndicator, Header, Calendar as CalendarComponent, TableHead, TableBody, TableField } from './Parts';

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
    const { 
        state, 
        style,
        locale,
        days,
        dispatch, 
        setStyle,
        setLocale,
    } = useContext(CalendarContext);
    const { date } = state;
    const { primaryColor, backgroundColor} = style;

    useEffect(() => {
        dispatch({ type: ActionType.SET_DATA, data: props.data ?? { date: new Date(), events: [] }});
    }, [props.data])
    useEffect(() => {
        setStyle({
            primaryColor: props.primaryColor ?? 'black',
            backgroundColor: props.backgroundColor ?? 'white',
        });
        setLocale(props.locale ?? Locale.EN);
    }, [props]);

    const [mode, setMode] = useState(props.defaultMode ?? CalendarMode.MONTH)    
    //Calculate some date stuff

    useEffect(() => {
        console.log(days)
    }, [days]);

    return (
        <div className={styles.container} style={{
            color: primaryColor,
            backgroundColor: backgroundColor,
            border: props.border ?? '1px solid black',
            borderRadius: props.borderRadius ?? '2em',
            boxShadow: props.boxShadow ?? '0 0 10px rgba(0, 0, 0, 0.1)',
        }}>
            {props.data &&
                <>
                <Header>
                    <ButtonGroup>
                        <Button onClick={() => dispatch({type: ActionType.SET_DATE,date: new Date()})}>{Localization[locale].buttons.today}</Button>
                        <Button onClick={() => {
                            switch (mode) {
                                case CalendarMode.MONTH:
                                    dispatch({type: ActionType.SET_MONTH, month: date.getMonth() - 1});
                                    break;
                                case CalendarMode.WEEK:
                                    dispatch({type: ActionType.SET_DAY, day: date.getDate() - 7});
                                    break;
                                case CalendarMode.DAY:
                                    dispatch({type: ActionType.SET_DAY, day: date.getDate() - 1});
                                    break;
                                default:
                                    break;
                            }
                        }}>-</Button>
                        <Button onClick={() => {
                            switch (mode) {
                                case CalendarMode.MONTH:
                                    dispatch({type: ActionType.SET_MONTH, month: date.getMonth() + 1});
                                    break;
                                case CalendarMode.WEEK:
                                    dispatch({type: ActionType.SET_DAY, day: date.getDate() + 7});
                                    break;
                                case CalendarMode.DAY:
                                    dispatch({type: ActionType.SET_DAY, day: date.getDate() + 1});
                                    break;
                                default:
                                    break;
                            }
                        }}>+</Button>
                    </ButtonGroup>
                    <DateIndicator />
                    <ButtonGroup>
                        <Button onClick={() => setMode(CalendarMode.MONTH)}>{Localization[locale].buttons.month}</Button>
                        <Button onClick={() => setMode(CalendarMode.WEEK)}>{Localization[locale].buttons.week}</Button>
                        <Button onClick={() => setMode(CalendarMode.DAY)}>{Localization[locale].buttons.day}</Button>
                    </ButtonGroup>
                </Header>
                <CalendarComponent>
                    <TableHead />
                    <TableBody>
                        {days.map((day, index) => {
                            return (
                                <TableField key={index} date={day} />
                            )
                        })}
                    </TableBody>
                </CalendarComponent>
                </>
                
            }
            {!props.data &&
                <div>
                    <p style={
                        {
                            color: primaryColor,
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