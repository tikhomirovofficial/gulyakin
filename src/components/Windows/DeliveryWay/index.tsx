import React, {useState} from 'react';
import WindowBody from "../WhiteWrapper";
import {handleYourAddress} from "../../../features/modals/modalsSlice";
import {CloseIcon, Geo} from "../../../icons";
import RedButton from "../../Buttons/RedButton";
import LightRedButton from "../../Buttons/LightRedButton";
import ShadowWrapper from "../ShadowWrapper";
import styles from './deliveryWay.module.scss'
import Switcher from "../../Switcher";
import InputWrapper from "../../Inputs/InputWrapper";
import {Map, YMaps} from "@pbe/react-yandex-maps";
import GrayBorderedBlock from "../../GrayBorderedBlock";
import {useAppDispatch} from "../../../app/hooks";

const DeliveryWay = () => {
    const dispatch = useAppDispatch()
    const [deliveryWay, setDeliveryWay] = useState(0)
    const handleDeliveryWay = (index: number) => {
        setDeliveryWay(index)
    }

    return (
        <ShadowWrapper>
            <WindowBody className={`${styles.window} f-row-betw p-rel`}>
                <div onClick={() => {}} className={"modalAbsoluteClose closeWrapper p-abs"}>
                    <CloseIcon isDark={true}/>
                </div>
                <div className={`${styles.content} f-column-betw pd-30 gap-20`}>
                    <div className="top f-column gap-10">
                        <h2>Новый адрес</h2>
                        <Switcher onSwitch={handleDeliveryWay} currentSelected={deliveryWay} elements={["Доставка", "Самовывоз"]}/>
                    </div>
                    {
                        deliveryWay === 0 ?
                            <>

                                <div className="f-column gap-10">
                                    <InputWrapper placeholder={"Сургут, ул. Университетская, д. 9"} labelText={
                                        <div className={"d-f al-center gap-5 svgRedStroke"}>
                                            Город, улица и дом
                                            <div className={"f-c-col w-content"}>
                                                <Geo width={12}/>
                                            </div>
                                        </div>
                                    } />
                                    <div className="f-row-betw gap-20 flex-wrap">
                                        <InputWrapper className={styles.partInputBlock}  placeholder={""} labelText={
                                            <div className={"d-f al-center gap-5 svgRedStroke"}>
                                                Подъезд
                                            </div>
                                        } />
                                        <InputWrapper className={styles.partInputBlock}  placeholder={""} labelText={
                                            <div className={"d-f al-center gap-5 svgRedStroke"}>
                                                Код двери
                                            </div>
                                        } />

                                    </div>
                                    <div className="f-row-betw gap-20 flex-wrap">
                                        <InputWrapper className={styles.partInputBlock}  placeholder={""} labelText={
                                            <div className={"d-f al-center gap-5 svgRedStroke"}>
                                                Этаж
                                            </div>
                                        } />
                                        <InputWrapper className={styles.partInputBlock}  placeholder={""} labelText={
                                            <div className={"d-f al-center gap-5 svgRedStroke"}>
                                                Квартира
                                            </div>
                                        } />

                                    </div>
                                    <InputWrapper placeholder={"Ваш комментарий..."} labelText={
                                        <div className={"d-f al-center gap-5 svgRedStroke"}>
                                            Комментарий
                                        </div>
                                    } />
                                </div>
                                <RedButton disabled={false} className={"pd-10-0"}>Указать адрес доставки</RedButton>
                            </> :
                            <>
                                <div className={`f-column gap-10 h-100p ${styles.addressesList}`}>
                                    <GrayBorderedBlock className={`pd-20 d-f gap-10 ${styles.addressItem} `}>
                                        <Geo/>
                                        <div className={`f-column gap-5 ${styles.text}`}>
                                            <h2>Энергетиков, д. 4</h2>
                                            <div className="f-column">
                                                <div className={styles.timeWork}>Пн-Пт: 7:30 - 23:00</div>
                                                <div className={styles.timeWork}>Пн-Пт: 7:30 - 23:00</div>
                                            </div>
                                        </div>
                                    </GrayBorderedBlock>
                                    <GrayBorderedBlock className={`pd-20 d-f gap-10 ${styles.addressItem} `}>
                                        <Geo/>
                                        <div className={`f-column gap-5 ${styles.text}`}>
                                            <h2>Энергетиков, д. 4</h2>
                                            <div className="f-column">
                                                <div className={styles.timeWork}>Пн-Пт: 7:30 - 23:00</div>
                                                <div className={styles.timeWork}>Пн-Пт: 7:30 - 23:00</div>
                                            </div>
                                        </div>
                                    </GrayBorderedBlock>
                                    <GrayBorderedBlock className={`pd-20 d-f gap-10 ${styles.addressItem} `}>
                                        <Geo/>
                                        <div className={`f-column gap-5 ${styles.text}`}>
                                            <h2>Энергетиков, д. 4</h2>
                                            <div className="f-column">
                                                <div className={styles.timeWork}>Пн-Пт: 7:30 - 23:00</div>
                                                <div className={styles.timeWork}>Пн-Пт: 7:30 - 23:00</div>
                                            </div>
                                        </div>
                                    </GrayBorderedBlock>

                                </div>
                                <RedButton disabled={false} className={"pd-10-0"}>Выбрать</RedButton>
                            </>


                    }

                </div>
                <div className={styles.map}>
                    <YMaps>
                        <Map className={"h-100p w-100p"}
                             state={{center: [0,9], zoom: 9}}/>
                    </YMaps>
                </div>
            </WindowBody>
        </ShadowWrapper>
    );
};

export default DeliveryWay;