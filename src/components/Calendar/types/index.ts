export enum ActionType {
    ADD_EVENT = 'ADD_EVENT',
    CLEAR_EVENTS = 'REMOVE_EVENT',
    SET_DATA = 'SET_DATA',
    SET_DATE = 'SET_DATE',
    SET_MONTH = 'SET_MONTH',
    SET_DAY = 'SET_DAY',
}

export class CustomProperty {
    key: string = '';
    value: any = '';	

    toString() : string {
        return JSON.stringify(this.value);
    }
}

export interface ICalendarEvent {
    title: string;
    start: Date;
    end: Date;
    customData?: CustomProperty[];
}

export interface IInternalCalendarEvent extends ICalendarEvent {
    row: number;
    color: string;
}

export interface ICalendarData {
    date: Date;
    events: ICalendarEvent[];
}

export interface IInternalCalendarData extends ICalendarData {
    events: IInternalCalendarEvent[];
}



export enum CalendarMode {
    MONTH = 'month',
    WEEK = 'week',
    DAY = 'day',
}