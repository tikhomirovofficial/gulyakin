import React from "react";
import ShadowWrapper from "../ShadowWrapper";
import WindowBody from "../WhiteWrapper";
import {CloseIcon} from "../../../icons";
import styles from "./yourAdress.module.scss"
import {useAppDispatch} from "../../../app/hooks";
import {handleBooking, handleYourAddress} from "../../../features/modals/modalsSlice";
import RedButton from "../../Buttons/RedButton";
import LightRedButton from "../../Buttons/LightRedButton";

const YourAddressWindow = () => {
    const dispatch = useAppDispatch()
    return (
        <ShadowWrapper>
            <WindowBody className={`${styles.window} f-column`}>
                <div className="w-100p d-f jc-end">
                    <div onClick={() => dispatch(handleYourAddress())} className={"closeWrapper"}>
                        <CloseIcon isDark={true}/>
                    </div>
                </div>
                <div className="f-column gap-20">
                    <div className="f-column gap-20">
                        <h2>Ваш адрес</h2>
                        <p className={styles.caption}>Мы хотим убедиться, что ваш адрес входит в нашу зону доставки, чтобы мы могли сохранить его для будущих заказов.</p>
                        <div className="f-column gap-10">
                            <RedButton disabled={false} className={"pd-10-0"}>Указать адрес доставки</RedButton>
                            <LightRedButton disabled={false} className={"pd-10-0"}>Забрать из ресторана</LightRedButton>
                        </div>
                    </div>
                    <div className="f-column gap-15">

                        <div className={"caption caption-big txt-center"}>Уже есть аккаунт? <a href="">Войти</a></div>
                    </div>

                </div>


            </WindowBody>
        </ShadowWrapper>
    );
};

export default YourAddressWindow;