import React, { useContext } from 'react';
import { Localization } from './Localization';
import { CalendarContext } from './Context';

const DateIndicator = () => {
    const { 
        locale,
        state: { date }
    } = useContext(CalendarContext);
    return (
        <div>{`${Localization[locale].months[date?.getMonth() ?? 0]} ${date?.getFullYear()}`}</div>
    )
}

export { DateIndicator };