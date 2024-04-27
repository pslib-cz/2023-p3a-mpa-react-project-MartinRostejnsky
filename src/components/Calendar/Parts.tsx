import React, { useContext } from 'react';
import { Localization } from './Localization';
import { ActionType, CalendarContext } from './Context';
import styles from './Calendar.module.css';

const DateIndicator = () => {
    const { 
        locale,
        state: { date }
    } = useContext(CalendarContext);
    return (
        <div><p className={styles.header__title}>{`${Localization[locale].months[date?.getMonth() ?? 0]} ${date?.getFullYear()}`}</p></div>
    )
}

const Header = ({children}: {children: React.ReactNode}) => { 
    return (
        <div className={styles.header}>{children}</div>
    )
}

const TableHead = () => {
    const { 
        locale,
    } = useContext(CalendarContext);
    return (
        <div className={styles.table__head}>
            {Localization[locale].days.map((day, index) => (
                <div key={index}>
                    <p>{day}</p>
                </div>
        ))}
        </div>
    )
}

const TableBody = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={styles.table__body}>{children}</div>
    )

}

const TableField = ({date}: {date: Date}) => {
    const {
        state: { date: currentDate },
        dispatch,
    } = useContext(CalendarContext);
    const current = date.getMonth() === currentDate.getMonth();
    return (
        <div onClick={!current ? () => {
            dispatch({type: ActionType.SET_DATE, date: date});
        } : undefined} className={`${styles.table__field} ${current ? '' : styles["table__field--inactive"]}`}>
            <p>{date.getDate()}</p>
        </div>
    )
}

const Calendar = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={styles.calendar}>{children}</div>
    )
}

export { 
    DateIndicator,
    Header,
    TableHead,
    TableBody,
    TableField,
    Calendar
};