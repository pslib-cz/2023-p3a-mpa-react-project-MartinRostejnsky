import React, { useContext } from 'react';
import { Localization } from './Localization';
import { CalendarContext } from './Context';
import styles from './Calendar.module.css';

const DateIndicator = () => {
    const { 
        locale,
        state: { date }
    } = useContext(CalendarContext);
    return (
        <div>{`${Localization[locale].months[date?.getMonth() ?? 0]} ${date?.getFullYear()}`}</div>
    )
}

const Header = ({children}: {children: React.ReactNode}) => { 
    return (
        <div className={styles.header}>{children}</div>
    )
}

export { DateIndicator, Header };