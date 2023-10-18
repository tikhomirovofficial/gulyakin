import React from 'react';
import Header from "../../components/Header";
import styles from './order.module.scss'
import LogosSection from "../../components/LogosSection";
import InputWrapper from "../../components/Inputs/InputWrapper";
import {EditIcon, PaymentCard, PaymentCash} from "../../icons";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import RedButton from "../../components/Buttons/RedButton";
import RadioInput from "../../components/Inputs/RadioInput";
import SelectInput from "../../components/Inputs/SelectInput";
import Footer from "../../components/Footer";
import {
    handleOrderCallNeeded, handleOrderFormEditing,
    handleOrderFormVal,
    handleOrderPaymentWay,
    handleOrderTime, handleProfileFormEditing,
    handleProfileFormVal
} from "../../features/forms/formsSlice";
import {formatNumberWithSpaces} from "../../utils/numberWithSpaces";
import {TextField} from "../../components/Inputs/TextField";

const orderTimes  = ["18:30", "19:30"]

const Order = () => {
    const {data, addresses} = useAppSelector(state => state.profile)
    const {totalPrice} = useAppSelector(state => state.cart)
    const {name, callNeeded, time, paymentWay, address, phone} = useAppSelector(state => state.forms.orderForm)

    const dispatch = useAppDispatch()
    return (
        <>
            <Header/>
            <LogosSection/>
            <div className={styles.order}>
                <div className="wrapper">
                    <div className="orderBlock f-column gap-40">
                        <div className={`${styles.form} f-column gap-25`}>
                            <div className="sectionTitle">Заказ на доставку</div>
                            <div className="f-column gap-20">
                                <div className="f-column gap-10">
                                    <div className="orderForm f-column gap-20">
                                        <InputWrapper
                                                      className={styles.inputField}
                                                      grayBorderedClassName={styles.inputField}
                                                      setVal={val => dispatch(handleOrderFormVal({keyField: "name", val: val}))}
                                                      changeVal={e => dispatch(handleOrderFormVal({keyField: "name", val: e.target.value}))}
                                                      inputVal={name.val} placeholder={"Иван"}
                                                      labelText={
                                                          "Ваше имя"
                                                      }/>
                                        <InputWrapper disabled={true} inActive={true}
                                                      grayBorderedClassName={styles.inputField}
                                                      locked={true}
                                                      inputVal={"+7 (951) 735-89-45"} placeholder={"Номер телефона"}
                                                      labelText={
                                                          "Номер телефона"
                                                      }/>
                                        <TextField
                                            handleSave={() => alert("Сохраняем")}
                                            className={`${styles.inputField} ${styles.textAreaField}`}
                                            placeholder={"Адрес"}
                                            labelText={"Адрес доставки"}
                                            isTextArea={true}
                                            isEditing={address.isEditing}
                                            formValue={address.val}
                                            condValue={"Адрес 1"}
                                            onInputFocus={() => {
                                                dispatch(handleOrderFormEditing("address"))
                                            }}
                                            onInputBlur={() => {
                                                dispatch(handleOrderFormEditing("address"))
                                            }}
                                            setVal={val => dispatch(handleOrderFormVal({keyField: "address", val: val}))}
                                            changeVal={e => dispatch(handleOrderFormVal({keyField: "address", val: e.target.value}))}
                                        />


                                    </div>
                                    <b className={`${styles.wayOrderBtn} colorRed cur-pointer`}>Выбрать самовывоз</b>
                                </div>
                                <div className={`f-column gap-20 ${styles.orderOptions}`}>
                                    <div className={`${styles.timeOrder} f-column gap-10`}>
                                        <p className={""}>Время доставки</p>
                                        <div className={`${styles.timeOrderItems} gap-10 f-column w-100p`}>
                                            <div className="d-f jc-between gap-10">
                                                <div
                                                    onClick={() => dispatch(handleOrderTime("FAST"))}
                                                    className={`${styles.inputSelectable} ${time === "FAST" ? "whiteSelectableSelected" : ""} f-1 whiteSelectable txt-center p-rel`}>
                                                    <p>Через ~90 мин</p>
                                                </div>
                                                <SelectInput placeholder={"Другое время"} iconMiniArrow={{
                                                    height: 10,
                                                    width: 10
                                                }} classDropDown={styles.orderSelect}
                                                             classNameBlock={`${styles.inputSelectable} ${styles.timeSelect} ${time !== "FAST" ? "whiteSelectableSelected" : ""} whiteSelectable gap-5 f-1`}
                                                             selectHandler={(selected) => {
                                                                 dispatch(handleOrderTime(orderTimes[selected]))
                                                             }} items={orderTimes}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="f-column gap-20">
                                        <RadioInput selected={callNeeded} text={
                                            <p><b>Требуется</b> звонок оператора</p>
                                        } onSelect={() => {
                                            dispatch(handleOrderCallNeeded())
                                        }}/>
                                        <RadioInput selected={!callNeeded} text={
                                            <p>Звонок оператора <b>не требуется</b></p>
                                        } onSelect={() => {
                                            dispatch(handleOrderCallNeeded())
                                        }}/>
                                    </div>
                                </div>

                            </div>


                        </div>
                        <div className={`${styles.leftContent} orderBottom f-column gap-40`}>
                            <div className="f-column gap-20 paymentWay">
                                <div className="sectionTitle">Способы оплаты</div>
                                <div className="d-f gap-10">
                                    <div
                                        onClick={() => {
                                            dispatch(handleOrderPaymentWay("CARD"))
                                        }}
                                        className={`${styles.inputSelectable} ${paymentWay == "CARD" ? "whiteSelectableSelected" : ""} d-f al-center gap-5 whiteSelectable`}>
                                        <PaymentCard/>
                                        <p>Картой онлайн</p>
                                    </div>
                                    <div
                                        onClick={() => {
                                            dispatch(handleOrderPaymentWay("CASH"))
                                        }}
                                        className={`${styles.inputSelectable} ${paymentWay == "CASH" ? "whiteSelectableSelected" : ""} d-f al-center gap-5 whiteSelectable`}>
                                        <PaymentCash/>
                                        <p>Наличными</p>
                                    </div>
                                </div>
                            </div>
                            <div className="f-column gap-15">
                                <RedButton disabled={!(address.val.length > 0) && !(totalPrice > 0)} className={"pd-15"}>Оформить заказ на {formatNumberWithSpaces(totalPrice)} ₽</RedButton>
                                <div className={"w-100p d-f jc-center"}>
                                    <b className={`${styles.backCart}`}>Вернуться в корзину</b>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Order;