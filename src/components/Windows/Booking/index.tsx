import React, {useEffect} from "react";
import ShadowWrapper from "../ShadowWrapper";
import WindowBody from "../WhiteWrapper";
import {CloseIcon} from "../../../icons";
import SelectInput from "../../Inputs/SelectInput";
import styles from "./booking.module.scss"
import InputWrapper from "../../Inputs/InputWrapper";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {handleBooking} from "../../../features/modals/modalsSlice";
import RedButton from "../../Buttons/RedButton";
import {
    handleBookingForm,
    setBookingAddress, setBookingError,
    setBookingForm,
    setIsBookingsSuccess
} from "../../../features/forms/formsSlice";
import {getAvailableTimes} from "../../../utils/avaliableTimes";
import CalendarInput from "../../Inputs/CalendarInput";
import {formatPhoneNumber} from "../../../utils/forms/formatePhone";
import {isAfter10PM, isToday} from "../../../utils/dates";
import {createBooking} from "../../../features/forms/formsSlice";
import {extractDigits} from "../../../utils/normalizePhone";
import SuccessWindow from "../SuccessWindow";


const countGuests = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10"
]

const BookingWindow = () => {
    const dispatch = useAppDispatch()
    const {bookingAddresses} = useAppSelector(state => state.main)
    const {bookingForm, bookingSuccess, bookingError} = useAppSelector(state => state.forms)
    const {profile} = useAppSelector(state => state)
    const defaultAddress = bookingAddresses.length ? bookingAddresses[0].id : -1
    const isDateDisabled = (date: any) => {
        return isToday(date) || isAfter10PM(date);
    };
    const times = getAvailableTimes()

    useEffect(() => {
        const today = new Date()
        if(isDateDisabled(today)) {
            today.setDate(today.getDate() + 1)
        }
        dispatch(setBookingForm({
            adress: defaultAddress,
            count_guest: Number(countGuests[0]),
            name: profile.data.name || "",
            phone: profile.data.phone.length ? formatPhoneNumber(profile.data.phone) : "",
            time: times[0],
            date: `${today.getMonth() + 1}.${today.getDate()}.${today.getFullYear()}`
        }))
    }, [bookingAddresses])

    const sendBookingCreate = () => {
        if(bookingError.length) {
            setBookingError("")
        }
        dispatch(setBookingError(""))
        dispatch(createBooking({
            ...bookingForm,
            phone: extractDigits(bookingForm.phone),
            count_guest: Number(bookingForm.count_guest)
        }))
    }
    const closeSuccess = () => {
        dispatch(setIsBookingsSuccess(false))
        dispatch(handleBooking())
    }

    return (
        <ShadowWrapper onClick={() => dispatch(handleBooking())}>
            <WindowBody className={`${styles.window} miniScrollbar f-column`}>
                <div className="w-100p d-f jc-end ">
                    <div onClick={() => dispatch(handleBooking())} className={"closeWrapper"}>
                        <CloseIcon isDark={true}/>
                    </div>
                </div>
                <div className="f-column gap-30">
                    <div className={`${styles.bookingForm} f-column gap-20`}>
                        <h2>Бронирование столика</h2>
                        <div className="f-column gap-20">
                            <div className="f-column gap-10">
                                <CalendarInput setCalendarVal={(val) => {
                                    console.log(val)
                                    dispatch(handleBookingForm({
                                        keyField: "date",
                                        val: `${val.getMonth() + 1}.${val.getDate()}.${val.getFullYear()}`
                                    }))
                                }} val={new Date(bookingForm.date)}/>
                            </div>
                            <div className="f-column">
                                <SelectInput
                                    defaultCurrent={defaultAddress}
                                    labelText={"Выберите ресторан (обязательно)"}
                                    classDropDownWrapper={`${styles.inputSelect} miniScrollbar`}
                                    selectHandler={(selected) => {
                                        dispatch(setBookingAddress(selected))
                                    }}
                                    optionsSelect={{byId: true, keyField: "adress"}}
                                    items={bookingAddresses}/>
                            </div>
                            <div className="f-row-betw gap-20 flex-wrap">
                                <SelectInput defaultCurrent={0}
                                             classDropDownWrapper={`${styles.inputSelect} miniScrollbar`}
                                             className={`f-1 `}
                                             labelText={"Время"}
                                             selectHandler={(selected) => {
                                                 dispatch(handleBookingForm({
                                                     keyField: "time",
                                                     val: times[selected]
                                                 }))
                                             }} items={times}/>
                                <SelectInput defaultCurrent={0}
                                             classDropDownWrapper={`${styles.inputSelect} miniScrollbar`}
                                             className={`f-1 `} labelText={"Количество гостей"}
                                             selectHandler={(selected) => {
                                                 dispatch(handleBookingForm({
                                                     keyField: "count_guest",
                                                     val: countGuests[selected]
                                                 }))
                                             }} items={countGuests}/>
                            </div>
                            <div className="f-column gap-15">
                                <InputWrapper setVal={(val) => dispatch(handleBookingForm({
                                    keyField: "name",
                                    val
                                }))}
                                              changeVal={e => dispatch(handleBookingForm({
                                                  keyField: "name",
                                                  val: e.target.value
                                              }))}
                                              inputVal={bookingForm.name}
                                              placeholder={"Вячеслав"} labelText={"Ваше имя"}/>
                            </div>
                            <div className="f-column gap-15">
                                <InputWrapper placeholder={"+7"} mask={"+7(999) 999 99-99"} isPhone={true}
                                              setVal={(val) => dispatch(handleBookingForm({
                                                  keyField: "phone",
                                                  val
                                              }))}
                                              errText={""} labelText={"Номер телефона"}
                                              inputId={"phone"} inputVal={bookingForm.phone}
                                              changeVal={e => dispatch(handleBookingForm({
                                                  keyField: "phone",
                                                  val: e.target.value
                                              }))}/>
                            </div>
                        </div>

                    </div>
                    <div className="f-column gap-15">
                        <div className="f-column gap-5">
                            {bookingError.length ? <b className={"colorError"}>{bookingError}</b> : null}
                            <RedButton onClick={sendBookingCreate} disabled={(bookingForm.phone?.includes("_") || bookingForm.phone.length == 0) || !bookingForm.name.length || bookingAddresses.length == 0 }
                                       className={"pd-10-0"}>Забронировать</RedButton>
                        </div>

                        <div className={"caption txt-center"}>Продолжая, вы соглашаетесь <a href=""> со сбором и
                            обработкой персональных данных и пользовательским соглашением</a></div>
                    </div>

                </div>

            <SuccessWindow isOpened={bookingSuccess} title={"Забронировано"} closeHandle={closeSuccess}/>
            </WindowBody>
        </ShadowWrapper>
    );
};

export default BookingWindow;