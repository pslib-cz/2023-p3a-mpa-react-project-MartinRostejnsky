import React, { createContext, useEffect, useReducer, useState } from 'react';
import { Locale } from './Localization';
import { reducer, ReducerAction } from './Reducer';
import { ICalendarEvent, IInternalCalendarData } from './types';

interface CalendarStyle {
    primaryColor?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    boxShadow?: string;
}

// Define the initial state of the context
interface CalendarContextState {
    state: IInternalCalendarData;
    style: CalendarStyle;
    locale: Locale;
    days: Date[];
    displayedEvent: ICalendarEvent | undefined;
    open: boolean;
    dispatch: React.Dispatch<ReducerAction>;
    setStyle: React.Dispatch<React.SetStateAction<CalendarStyle>>;
    setLocale: React.Dispatch<React.SetStateAction<Locale>>;
    setDisplayedEvent: React.Dispatch<React.SetStateAction<ICalendarEvent | undefined>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
export const CalendarContext = createContext<CalendarContextState>({
    style: {},
    state: {
        date: new Date(),
        events: [],
    },
    locale: Locale.EN,
    days: [],
    displayedEvent: undefined,
    open: true,
    setLocale: () => null,
    dispatch: () => null,
    setStyle: () => null,
    setDisplayedEvent: () => null,
    setOpen: () => null, 
});

// Create a provider component
export interface CalendarProviderProps {
    children: React.ReactNode;
}

export const CalendarProvider: React.FC<CalendarProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        date: new Date(),
        events: [],
    });

    const [open, setOpen] = useState(true);

    const [displayedEvent, setDisplayedEvent] = useState<ICalendarEvent | undefined>(undefined);

    const [style, setStyle] = useState<CalendarStyle>({});
    const [locale, setLocale] = useState(Locale.EN);

    const [days, setDays] = useState<Date[]>([]);

    //Calculate some date stuff
    const [_firstDay, setFirstDay] = useState(new Date(state.date.getFullYear(), state.date.getMonth(), 1).getDay());
    const [monthLength, setMonthLength] = useState(new Date(state.date.getFullYear(), state.date.getMonth() + 1, 0).getDate());
    const [lastMonthLength, setLastMonthLength] = useState(new Date(state.date.getFullYear(), state.date.getMonth(), 0).getDate());

    useEffect(() => {
        const dayOfWeek = new Date(state.date.getFullYear(), state.date.getMonth(), 1).getDay();
        const adjustedFirstDay = (dayOfWeek + 6) % 7; // Calculate adjusted first day of the week (Monday start)
        
        setFirstDay(adjustedFirstDay);
        setMonthLength(new Date(state.date.getFullYear(), state.date.getMonth() + 1, 0).getDate());
        setLastMonthLength(new Date(state.date.getFullYear(), state.date.getMonth(), 0).getDate());
    
        // Calculate days using adjustedFirstDay
        const newDays = [];
        const startDay = -adjustedFirstDay;  
        let totalDaysDisplayed = startDay + monthLength;

        // Adjust totalDaysDisplayed to be divisible by 7
        while ((totalDaysDisplayed + adjustedFirstDay) % 7 !== 0) {
            totalDaysDisplayed++;
        }
        for (let i = startDay; i < totalDaysDisplayed; i++) {
            newDays.push(new Date(state.date.getFullYear(), state.date.getMonth(), i + 1));
        }
    
        setDays(newDays);
    }, [monthLength, lastMonthLength, state.date]);
    
    return (
        <CalendarContext.Provider value={{ 
            state,
            style,
            locale,
            days,
            displayedEvent,
            open,
            dispatch,
            setStyle,
            setLocale,
            setDisplayedEvent,
            setOpen,
            }}>
            {children}
        </CalendarContext.Provider>
    );
};