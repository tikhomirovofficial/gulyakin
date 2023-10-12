import React, {useEffect, useState} from "react";
import ShadowWrapper from "../ShadowWrapper";
import WindowBody from "../WhiteWrapper";
import {CloseIcon} from "../../../icons";
import styles from "./newAddress.module.scss"
import InputWrapper from "../../Inputs/InputWrapper";
import {useAppDispatch} from "../../../app/hooks";
import {handleNewAddress} from "../../../features/modals/modalsSlice";
import RedButton from "../../Buttons/RedButton";
import {Address} from "../../../types/user.types";
import {useInput} from "../../../hooks/useInput";
import {checkFilledValues} from "../../../utils/checkFilledValues";
import {addAddress} from "../../../features/profile/profileSlice";

const NewAddressWindow = () => {
    const dispatch = useAppDispatch()
    const [formNewAddress, setFormNewAddress] = useState<Address>({
        city: "",
        code_door: "",
        entrance: "",
        flat: "",
        floor: "",
    })

    const handleFormNewAddress = (key: keyof Address, val: string) => {
        setFormNewAddress(prevState => {
            prevState[key] = val
            return {...prevState}
        })
    }

    const isValidAddressData = checkFilledValues(formNewAddress, ["code_door"])

    const handleAddAddress = () => {
        dispatch(addAddress({
            ...formNewAddress,
            id: Date.now()
        }))
        dispatch(handleNewAddress())
    }
    return (
        <ShadowWrapper>
            <WindowBody className={`${styles.window} f-column`}>
                <div className="w-100p d-f jc-end">
                    <div onClick={() => dispatch(handleNewAddress())} className={"closeWrapper"}>
                        <CloseIcon isDark={true}/>
                    </div>
                </div>
                <div className="f-column gap-30">
                    <div className="f-column gap-20">
                        <h2>Новый адрес</h2>
                        <div className="f-column gap-15">
                            <InputWrapper setVal={val => handleFormNewAddress("city", val)} inputVal={formNewAddress.city} changeVal={(e) => handleFormNewAddress("city", e.currentTarget.value)} placeholder={"Сургут, ул. Университетская, д. 9"}
                                          labelText={"Город, улица и дом"}/>
                        </div>
                        <div className="f-row-betw gap-20 flex-wrap">
                            <InputWrapper setVal={val => handleFormNewAddress("entrance", val)} inputVal={formNewAddress.entrance} changeVal={(e) => handleFormNewAddress("entrance", e.currentTarget.value)} className={styles.shortInput} placeholder={"9"} labelText={"Подъезд"}/>
                            <InputWrapper setVal={val => handleFormNewAddress("code_door", val)} inputVal={formNewAddress.code_door} changeVal={(e) => handleFormNewAddress("code_door", e.currentTarget.value)} className={styles.shortInput} placeholder={"345"} labelText={"Код двери"}/>
                        </div>
                        <div className="f-row-betw gap-20 flex-wrap">
                            <InputWrapper setVal={val => handleFormNewAddress("floor", val)} inputVal={formNewAddress.floor} changeVal={(e) => handleFormNewAddress("floor", e.currentTarget.value)} className={styles.shortInput} placeholder={"7"} labelText={"Этаж"}/>
                            <InputWrapper setVal={val => handleFormNewAddress("flat", val)} inputVal={formNewAddress.flat} changeVal={(e) => handleFormNewAddress("flat", e.currentTarget.value)} className={styles.shortInput} placeholder={"45"} labelText={"Квартира"}/>
                        </div>
                    </div>
                    <RedButton onClick={handleAddAddress} disabled={!isValidAddressData} className={"pd-10-0"}>Добавить</RedButton>


                </div>


            </WindowBody>
        </ShadowWrapper>
    );
};

export default NewAddressWindow;