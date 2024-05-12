import { ICalendarData, ICalendarEvent, IInternalCalendarData, IInternalCalendarEvent } from "./types";
import { ActionType } from "./types";

export type ReducerAction = 
{ type: ActionType.ADD_EVENT, event: ICalendarEvent } |
{ type: ActionType.CLEAR_EVENTS } |
{ type: ActionType.SET_DATA, data: ICalendarData } |
{ type: ActionType.SET_DATE, date: Date } |
{ type: ActionType.SET_MONTH, month: number } |
{ type: ActionType.SET_DAY, day: number };

export const reducer = (state: IInternalCalendarData, action: ReducerAction) => {
    switch (action.type) {
        case ActionType.ADD_EVENT:
            return {
                ...state,
                events: [...state.events, {...action.event, row: 0, color: 'blue'}], //TODO: actually implement
            };
        case ActionType.CLEAR_EVENTS:
            return {
                ...state,
                events: [],
            };
        case ActionType.SET_DATA:
            const ColorDictionary = [
                '#C3C9FF',
                '#5BC0DE',
                '#83C291',
            ]
            const calculateRow = (event: ICalendarEvent, previousEvents : IInternalCalendarEvent[]) => {
                let row;
                for (let i = 0; row === undefined; i++) {
                    if (
                        previousEvents.filter((previousEvent) => {
                            return ((
                                (previousEvent.start.getTime() <= event.end.getTime() &&
                                previousEvent.start.getTime() >= event.start.getTime()) 
                                ||
                                (previousEvent.end.getTime() >= event.end.getTime() &&
                                previousEvent.end.getTime() <= event.end.getTime())
                                ||
                                (event.start.getTime() <= previousEvent.end.getTime() &&
                                event.start.getTime() >= previousEvent.start.getTime()) 
                                ||
                                (event.end.getTime() >= previousEvent.end.getTime() &&
                                event.end.getTime() <= previousEvent.end.getTime())
                                ||
                                (previousEvent.start.getTime() < event.start.getTime() &&
                                previousEvent.end.getTime() > event.end.getTime())
                                ||
                                (event.start.getTime() <= previousEvent.start.getTime() &&
                                event.end.getTime() >= previousEvent.end.getTime())
                            ) && previousEvent.row === i);
                        }).length === 0
                    ) {
                        row = i;
                    }
                }
                return row;
            }
            let previousEvents : IInternalCalendarEvent[] = [];
            const internalEvents = action.data.events.map((event, i) => {
                const newEvent = {
                    ...event,
                    start: new Date(event.start),
                    end: new Date(event.end),
                    row: calculateRow(event, previousEvents),
                    color: ColorDictionary[i%ColorDictionary.length], //TODO: implement color dictionary                
                };
                previousEvents.push(newEvent);
                return newEvent;
            });
            return {
                ...action.data,
                events: internalEvents,
            };
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