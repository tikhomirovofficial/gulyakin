import React, {useState} from "react";
import {useInput} from "../../../hooks/useInput";
import ShadowWrapper from "../ShadowWrapper";
import WindowBody from "../WhiteWrapper";
import {CloseIcon} from "../../../icons";
import SelectInput from "../../Inputs/SelectInput";
import styles from "./booking.module.scss"
import InputWrapper from "../../Inputs/InputWrapper";
import {useAppDispatch} from "../../../app/hooks";
import {handleBooking, handleLogin} from "../../../features/modals/modalsSlice";
import RedButton from "../../Buttons/RedButton";
const rests = [
    {
        id: 1,
        name: "Первый"
    },
    {
        id: 2,
        name: "Второй"
    }
]
const BookingWindow = () => {
    const dispatch = useAppDispatch()

    return (
        <ShadowWrapper onClick={() => dispatch(handleBooking())}>
            <WindowBody className={`${styles.window} f-column`}>
                <div className="w-100p d-f jc-end">
                    <div onClick={() => dispatch(handleBooking())} className={"closeWrapper"}>
                        <CloseIcon isDark={true}/>
                    </div>
                </div>
                <div className="f-column gap-30">
                    <div className="f-column gap-20">
                        <h2 >Бронирование столика</h2>
                        <div className="f-column">
                            <SelectInput defaultCurrent={2} labelText={"Выберите ресторан (обязательно)"} selectHandler={(selected) => {
                                console.log(selected)}} optionsSelect={{byId: true, keyField:"name"}}  items={rests}/>
                        </div>
                        <div className="f-row-betw gap-20 flex-wrap">
                            <SelectInput defaultCurrent={1} className={"f-1"} labelText={"Время"} selectHandler={(selected) => {
                                console.log(selected)}}  items={["18:30", "19:30"]}/>
                            <SelectInput defaultCurrent={0} className={"f-1"} labelText={"Количество гостей"} selectHandler={(selected) => {
                                console.log(selected)}}  items={["2", "3"]}/>
                        </div>
                        <div className="f-column gap-15">
                            <InputWrapper placeholder={"Вячеслав"} labelText={"Ваше имя"} />
                        </div>
                        <div className="f-column gap-15">
                            <InputWrapper placeholder={"+7"} labelText={"Номер телефона (обязательно)"} />
                        </div>
                    </div>
                    <div className="f-column gap-15">
                        <RedButton disabled={true} className={"pd-10-0"}>Забронировать</RedButton>
                        <div className={"caption txt-center"}>Продолжая, вы соглашаетесь <a href=""> со сбором и
                            обработкой персональных данных и пользовательским соглашением</a></div>
                    </div>

                </div>


            </WindowBody>
        </ShadowWrapper>
    );
};

export default BookingWindow;