import React, {useState} from "react";
import {useInput} from "../../../hooks/useInput";
import ShadowWrapper from "../ShadowWrapper";
import WindowBody from "../WhiteWrapper";
import {CloseIcon} from "../../../icons";
import SelectInput from "../../Inputs/SelectInput";
import styles from "./booking.module.scss"
const BookingWindow = () => {

    return (
        <ShadowWrapper>
            <WindowBody className={`${styles.window} f-column`}>
                <div className="w-100p d-f jc-end"><CloseIcon isDark={true}/></div>

                <div className="f-column gap-20">
                    <h2 >Бронирование столика</h2>
                    <div className="f-column">
                        <SelectInput labelText={"Выберите ресторан (обязательно)"} selectHandler={(selected) => {
                            console.log(selected)}}  items={["первый", "второй"]}/>
                    </div>
                    <div className="f-row-betw gap-20">
                        <SelectInput defaultCurrent={1} className={"f-1"} labelText={"Время"} selectHandler={(selected) => {
                            console.log(selected)}}  items={["18:30", "19:30"]}/>
                        <SelectInput className={"f-1"} labelText={"Количество гостей"} selectHandler={(selected) => {
                            console.log(selected)}}  items={["2", "3"]}/>
                    </div>

                </div>

            </WindowBody>
        </ShadowWrapper>
    );
};

export default BookingWindow;