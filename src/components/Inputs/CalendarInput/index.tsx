import React, {useState} from 'react';
import GrayBorderedBlock from "../../GrayBorderedBlock";
import {CalendarIcon} from "../../../icons";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Calendar } from 'primereact/calendar';

import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';


addLocale('ru', {
    firstDayOfWeek: 1,
    dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    dayNamesShort: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    dayNamesMin: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    monthNames: [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ],
    monthNamesShort: [
        'янв', 'фев', 'мар', 'апр', 'май', 'июн',
        'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
    ],
    today: 'Сегодня',
    clear: 'Очистить'
    //...
});

const CalendarInput = () => {
    const [isFocused, setIsFocused] = useState(false)

    const changeDate = (date: Date) => {

    }
    return (
        <>
            <label htmlFor="calendarInput">Дата</label>
            <GrayBorderedBlock isFocused={isFocused} labelFor={"calendarInput"} className={`calendar p-rel inputField f-row-betw gap-20 `}>
                <Calendar
                    minDate={new Date()}
                    inputId={"calendarInput"}
                    yearNavigator={false}
                           todayButtonClassName={"todayCalendar"} readOnlyInput={true} locale={"ru"}  value={new Date()}
                />
                <CalendarIcon/>
            </GrayBorderedBlock>
        </>

    );
};

export default CalendarInput;