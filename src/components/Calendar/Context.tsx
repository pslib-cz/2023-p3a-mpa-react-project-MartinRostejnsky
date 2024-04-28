import React, { createContext, useEffect, useMemo, useReducer, useState } from 'react';
import { ICalendarData, ICalendarEvent, IInternalCalendarEvent } from './Calendar';
import { Locale } from './Localization';

interface CalendarStyle {
    primaryColor?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    boxShadow?: string;
}

// Define the initial state of the context
interface CalendarContextState {
    state: ICalendarData;
    style: CalendarStyle;
    locale: Locale;
    days: Date[];
    dispatch: React.Dispatch<ReducerAction>;
    setStyle: React.Dispatch<React.SetStateAction<CalendarStyle>>;
    setLocale: React.Dispatch<React.SetStateAction<Locale>>;
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
    setLocale: () => null,
    dispatch: () => null,
    setStyle: () => null,
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

    const [style, setStyle] = useState<CalendarStyle>({});
    const [locale, setLocale] = useState(Locale.EN);

    const [days, setDays] = useState<Date[]>([]);

    //Calculate some date stuff
    const [firstDay, setFirstDay] = useState(new Date(state.date.getFullYear(), state.date.getMonth(), 1).getDay());
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
            dispatch,
            setStyle,
            setLocale,
            }}>
            {children}
        </CalendarContext.Provider>
    );
};

const reducer = (state: ICalendarData, action: ReducerAction) => {
    switch (action.type) {
        case ActionType.ADD_EVENT:
            return {
                ...state,
                events: [...state.events, action.event],
            };
        case ActionType.CLEAR_EVENTS:
            return {
                ...state,
                events: [],
            };
        case ActionType.SET_DATA:
            return action.data;
        case ActionType.SET_DATE:
            return {
                ...state,
                date: action.date,
            };
        case ActionType.SET_MONTH:
            return {
                ...state,
                date: new Date(state.date.getFullYear(), action.month),
            };
        case ActionType.SET_DAY:
            return {
                ...state,
                date: new Date(state.date.getFullYear(), state.date.getMonth(), action.day),
            };
        default:
            return state;
    }
};

type ReducerAction = 
{ type: ActionType.ADD_EVENT, event: IInternalCalendarEvent } |
{ type: ActionType.CLEAR_EVENTS } |
{ type: ActionType.SET_DATA, data: ICalendarData } |
{ type: ActionType.SET_DATE, date: Date } |
{ type: ActionType.SET_MONTH, month: number } |
{ type: ActionType.SET_DAY, day: number };

export enum ActionType {
    ADD_EVENT = 'ADD_EVENT',
    CLEAR_EVENTS = 'REMOVE_EVENT',
    SET_DATA = 'SET_DATA',
    SET_DATE = 'SET_DATE',
    SET_MONTH = 'SET_MONTH',
    SET_DAY = 'SET_DAY',
}