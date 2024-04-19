enum Locale {
    EN = 'en',
    CZ = 'cz',
    RU = 'ru',
}

const Localization = {
    [Locale.EN]: {
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        messages: {
            no_data: 'This calendar has no data.',
        },
        buttons: {
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day',
        },
    },
    [Locale.CZ]: {
        days: ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'],
        months: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
        messages: {
            no_data: 'Tento kalendář nemá žádná data.',
        },
        buttons: {
            today: 'Dnes',
            month: 'Měsíc',
            week: 'Týden',
            day: 'Den',
        },
    },
    [Locale.RU]: {
        days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        messages: {
            no_data: 'В этом календаре нет данных.',
        },
        buttons: {
            today: 'Сегодня',
            month: 'Месяц',
            week: 'Неделя',
            day: 'День',
        },
    },
};

export { Locale, Localization};