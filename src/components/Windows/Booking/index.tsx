import React from "react";
import ShadowWrapper from "../ShadowWrapper";
import WindowBody from "../WhiteWrapper";
import {CloseIcon} from "../../../icons";
import SelectInput from "../../Inputs/SelectInput";
import styles from "./booking.module.scss"
import InputWrapper from "../../Inputs/InputWrapper";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {handleBooking} from "../../../features/modals/modalsSlice";
import RedButton from "../../Buttons/RedButton";
import {handleBookingForm} from "../../../features/forms/formsSlice";
import {getAvailableTimes} from "../../../utils/avaliableTimes";
import CalendarInput from "../../Inputs/CalendarInput";

const times = getAvailableTimes()
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
    const {bookingForm} = useAppSelector(state => state.forms)
    return (
        <ShadowWrapper onClick={() => dispatch(handleBooking())}>
            <WindowBody className={`${styles.window} f-column`}>
                <div className="w-100p d-f jc-end">
                    <div onClick={() => dispatch(handleBooking())} className={"closeWrapper"}>
                        <CloseIcon isDark={true}/>
                    </div>
                </div>
                <div className="f-column gap-30">
                    <div className={`${styles.bookingForm} f-column gap-20`}>
                        <h2>Бронирование столика</h2>
                        <div className="f-column gap-20">
                            <div className="f-column gap-10">
                                <CalendarInput/>
                            </div>
                            <div className="f-column">
                                <SelectInput
                                    defaultCurrent={bookingAddresses.length > 0 ? bookingAddresses[0].id || -1 : -1}
                                    labelText={"Выберите ресторан (обязательно)"}
                                    classDropDownWrapper={`${styles.inputSelect} miniScrollbar`}
                                    selectHandler={(selected) => {
                                        dispatch(handleBookingForm({
                                            keyField: "adress",
                                            val: selected.toString()
                                        }))
                                    }}
                                    optionsSelect={{byId: true, keyField: "adress"}}
                                    items={bookingAddresses}/>
                            </div>
                            <div className="f-row-betw gap-20 flex-wrap">
                                <SelectInput defaultCurrent={1}
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
                        <RedButton disabled={(bookingForm.phone?.includes("_") || bookingForm.phone.length == 0) || !bookingForm.name.length}
                                   className={"pd-10-0"}>Забронировать</RedButton>
                        <div className={"caption txt-center"}>Продолжая, вы соглашаетесь <a href=""> со сбором и
                            обработкой персональных данных и пользовательским соглашением</a></div>
                    </div>

                </div>


            </WindowBody>
        </ShadowWrapper>
    );
};

export default BookingWindow;