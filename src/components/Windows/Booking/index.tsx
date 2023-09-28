import React, {useState} from "react";
import {useInput} from "../../../hooks/useInput";
import ShadowWrapper from "../ShadowWrapper";
import WindowBody from "../WhiteWrapper";
import styles from "../Login/login.module.scss";
import {CloseIcon} from "../../../icons";

const BookingWindow = () => {


    return (

            <ShadowWrapper>
                <WindowBody className={`${styles.window} f-column`}>
                    <div className="w-100p d-f jc-end"><CloseIcon isDark={true}/></div>
                    <h2>Бронирование столика</h2>
                </WindowBody>
            </ShadowWrapper>


    );
};

export default BookingWindow;