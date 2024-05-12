import { Locale } from "../Localization";

enum ActionType {
    ADD_EVENT = 'ADD_EVENT',
    CLEAR_EVENTS = 'REMOVE_EVENT',
    SET_DATA = 'SET_DATA',
    SET_DATE = 'SET_DATE',
    SET_MONTH = 'SET_MONTH',
    SET_DAY = 'SET_DAY',
}

class CustomProperty {
    key: string = '';
    value: any = '';	

    toString() : string {
        return JSON.stringify(this.value);
    }
}

interface ICalendarEvent {
    title: string;
    start: Date;
    end: Date;
    customData?: CustomProperty[];
}

interface IInternalCalendarEvent extends ICalendarEvent {
    row: number;
    color: string;
}

interface ICalendarData {
    date: Date;
    events: ICalendarEvent[];
}

interface IInternalCalendarData extends ICalendarData {
    events: IInternalCalendarEvent[];
}



enum CalendarMode {
    MONTH = 'month',
    WEEK = 'week',
    DAY = 'day',
}

export { 
    ActionType,
    CalendarMode,
    IInternalCalendarData,
    ICalendarData,
    IInternalCalendarEvent,
    ICalendarEvent,
    CustomProperty
};