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
        case ActionType.SET_WEEK:
            return {
                ...state,
                date: new Date(state.date.getFullYear(), state.date.getMonth(), action.week * 7),
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
{ type: ActionType.ADD_EVENT, event: ICalendarEvent } |
{ type: ActionType.CLEAR_EVENTS } |
{ type: ActionType.SET_DATA, data: ICalendarData } |
{ type: ActionType.SET_DATE, date: Date } |
{ type: ActionType.SET_MONTH, month: number } |
{ type: ActionType.SET_WEEK, week: number } |
{ type: ActionType.SET_DAY, day: number };

export enum ActionType {
    ADD_EVENT = 'ADD_EVENT',
    CLEAR_EVENTS = 'REMOVE_EVENT',
    SET_DATA = 'SET_DATA',
    SET_DATE = 'SET_DATE',
    SET_MONTH = 'SET_MONTH',
    SET_WEEK = 'SET_WEEK',
    SET_DAY = 'SET_DAY',
}