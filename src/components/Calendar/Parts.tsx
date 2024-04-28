import React, { useContext } from 'react';
import { Localization } from './Localization';
import { ActionType, CalendarContext } from './Context';
import styles from './Calendar.module.css';

const compareDates = (date1: Date, date2: Date) => {
    console.log(date1.getFullYear() === date2.getFullYear(), "year");
    console.log(date1.getMonth() === date2.getMonth(), "month");
    console.log(date1.getDate() === date2.getDate(), "day", date1.getDate(), date2.getDate());
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

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
        state: { date: currentDate, events: calendarEvents },
        dispatch,
    } = useContext(CalendarContext);

    const current = date.getMonth() === currentDate.getMonth();

    const sortedEvents = calendarEvents.sort((a, b) => a.row - b.row);
    const lastRow = sortedEvents.length > 0 ? sortedEvents[sortedEvents.length - 1].row : 0;
    const currentEvents = sortedEvents.filter(event => {
        const eventStartDate = new Date(event.start.getFullYear(), event.start.getMonth(), event.start.getDate());
        const eventEndDate = new Date(event.end.getFullYear(), event.end.getMonth(), event.end.getDate());
        const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return currentDate >= eventStartDate && currentDate <= eventEndDate;
    });

    console.log(date)
    console.log(calendarEvents)
    console.log(currentEvents)

    return (
        <div onClick={!current ? () => {
            dispatch({type: ActionType.SET_DATE, date: date});
        } : undefined} className={`${styles.table__field} ${current ? '' : styles["table__field--inactive"]}`}>
            <p>{date.getDate()}</p>
            {currentEvents.length > 0 && Array.from({ length: lastRow+1 }).map((_, index) => { 
                const currentEvent = currentEvents.find(event => event.row === index);
                const eventBar = (
                    <div 
                    className={`${styles.table__field__event} ${currentEvent && compareDates(currentEvent.start, date) ? styles["table__field__event--start"] : ''}`} 
                    style={{backgroundColor: currentEvent?.color, order: index}} key={index}>{currentEvent?.title}</div>
                )
                
                if (currentEvent && currentEvent.start) {
                
                    console.log(compareDates(currentEvent.start, date))
                }

                return eventBar; 
                })}
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