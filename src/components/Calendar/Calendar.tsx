import React, { useContext, useEffect, useState } from 'react';
import styles from './Calendar.module.css';
import { CalendarContext, CalendarProvider } from './Context';
import {Button,ButtonGroup} from './Buttons';
import { Locale, Localization } from './Localization';
import { DateIndicator, Header, Calendar as CalendarComponent, TableHead, TableBody, TableField, DetailsPortal } from './Parts';
import { ActionType, CalendarMode, ICalendarData } from './types';

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

const Calendar = (props: ICalendarProps) => {
    const { 
        state, 
        style,
        locale,
        days,
        open,
        dispatch, 
        setStyle,
        setLocale,
        setOpen,
    } = useContext(CalendarContext);
    const { date } = state;
    const { primaryColor, backgroundColor} = style;

    useEffect(() => {
        dispatch({ type: ActionType.SET_DATA, data: props.data ?? { date: new Date(), events: [] }});
    }, [props.data])
    useEffect(() => {
        setStyle({
            primaryColor: props.primaryColor ?? 'black',
            backgroundColor: props.backgroundColor ?? 'transparent',
        });
        setLocale(props.locale ?? Locale.EN);
    }, [props]);

    const [mode, _] = useState(props.defaultMode ?? CalendarMode.MONTH) // deprecated

    return (
        <div className={styles.container} style={{
            color: primaryColor,
            backgroundColor: backgroundColor,
            border: props.border ?? '1px solid #ccc',
            borderRadius: props.borderRadius ?? '.5em',
            boxShadow: props.boxShadow ?? '0 0 10px rgba(0, 0, 0, 0.1)',
            minHeight: open ? '40em' : 'auto',
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
                        }}>&lt;</Button>
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
                        }}>&gt;</Button>
                    </ButtonGroup>
                    <DateIndicator />
                    <ButtonGroup>
                        <Button onClick={() => setOpen(o => !o)}>{open ? Localization[locale].buttons.close : Localization[locale].buttons.open}</Button>
                    </ButtonGroup>
                </Header>
                {open && <CalendarComponent>
                    <TableHead />
                    <TableBody>
                        {days.map((day, index) => {
                            return (
                                <TableField key={index} date={day} />
                            )
                        })}
                    </TableBody>
                </CalendarComponent>}
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
            <DetailsPortal />
        </CalendarProvider>
    );
}

export default CalendarWrapper;