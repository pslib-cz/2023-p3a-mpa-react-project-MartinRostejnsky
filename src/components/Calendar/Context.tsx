import React, { createContext, useReducer, useState } from 'react';
import { ICalendarData, ICalendarEvent } from './Calendar';

// Define the initial state of the context
interface CalendarContextState {
    state: ICalendarData;
    dispatch: React.Dispatch<ReducerAction>;
}

// Create the context
export const CalendarContext = createContext<CalendarContextState>({
    state: {
        date: new Date(),
        events: [],
    },
    dispatch: () => null,
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
    return (
        <CalendarContext.Provider value={{ state, dispatch }}>
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
        default:
            return state;
    }
};

type ReducerAction = 
{ type: ActionType.ADD_EVENT, event: ICalendarEvent }

export enum ActionType {
    ADD_EVENT = 'ADD_EVENT',
    REMOVE_EVENT = 'REMOVE_EVENT',
    SET_DATE = 'SET_DATE',
    SET_EVENTS = 'SET_EVENTS',
    SET_MONTH = 'SET_MONTH',
    SET_WEEK = 'SET_WEEK',
    SET_DAY = 'SET_DAY',
}