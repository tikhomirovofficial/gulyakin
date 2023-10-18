import React from 'react';
import Header from "../../components/Header";
import styles from './order.module.scss'
import LogosSection from "../../components/LogosSection";
import InputWrapper from "../../components/Inputs/InputWrapper";
import {ArrowMiniRightIcon, EditIcon, PaymentCard, PaymentCash, SaveIcon} from "../../icons";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {handleProfileFormEditing, handleProfileFormVal} from "../../features/forms/formsSlice";
import RedButton from "../../components/Buttons/RedButton";
import RadioInput from "../../components/Inputs/RadioInput";
import SelectInput from "../../components/Inputs/SelectInput";

const Order = () => {
    const {data, addresses} = useAppSelector(state => state.profile)
    const {name, callNeeded, time, paymentWay} = useAppSelector(state => state.forms.orderForm)

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
                                        <InputWrapper isChanging={name.isEditing} setVal={val => dispatch(handleProfileFormVal({
                                            keyField: "name",
                                            val: val
                                        }))} changeVal={e => dispatch(handleProfileFormVal({
                                            keyField: "name",
                                            val: e.target.value
                                        }))} disabled={!name.isEditing} inActive={!name.isEditing}
                                                      grayBorderedClassName={styles.inputField} btn={
                                            name.isEditing ?
                                                <div onClick={name.val === data.name ? () => alert("da") : () => alert("net")}
                                                     className={"w-content cur-pointer f-c-col"}>
                                                    <SaveIcon fill={name.val === data.name ? "#E2E2E9" : "#FB634D"}/>
                                                </div> :
                                                <div onClick={() => dispatch(handleProfileFormEditing("name"))}
                                                     className={"w-content cur-pointer f-c-col"}>
                                                    <EditIcon/>
                                                </div>
                                        } inputVal={name.val} placeholder={"Ваше имя"} labelText={
                                            "Ваше имя"
                                        }/>
                                        <InputWrapper disabled={true} inActive={true} grayBorderedClassName={styles.inputField}
                                                      locked={true}
                                                      inputVal={"+7 (951) 735-89-45"} placeholder={"Номер телефона"}
                                                      labelText={
                                                          "Номер телефона"
                                                      }/>
                                        <InputWrapper isTextArea={true} disabled={true} inActive={true}
                                                      grayBorderedClassName={`${styles.inputField} ${styles.textAreaField}`}
                                                      inputVal={"г. Сургут, ул. Университетская, д. 9, под. 1, эт. 7, кв. 27"} placeholder={"Номер телефона"}
                                                      btn={
                                                          <div onClick={() => {}}
                                                               className={"w-content cur-pointer"}>
                                                              <EditIcon/>
                                                          </div>}
                                                      labelText={
                                                          "Адрес доставки"
                                                      }/>


                                    </div>
                                    <b className={`${styles.wayOrderBtn} colorRed cur-pointer`}>Выбрать самовывоз</b>
                                </div>
                                <div className={`f-column gap-20 ${styles.orderOptions}`}>
                                    <div className={`${styles.timeOrder} f-column gap-10`}>
                                        <p className={""}>Время доставки</p>
                                        <div className={`${styles.timeOrderItems} gap-10 f-column w-100p`}>
                                            <div className="d-f jc-between gap-10">
                                                <div className={`${styles.inputSelectable} f-1 whiteSelectable txt-center p-rel`}>
                                                    <p>Через ~40 мин</p>
                                                </div>
                                                <div className={`${styles.inputSelectable} whiteSelectable txt-center p-rel`}>
                                                    <p>19:45-20:45</p>
                                                </div>
                                            </div>
                                            <div className="d-f jc-between gap-10">
                                                <div className={`${styles.inputSelectable} whiteSelectable txt-center p-rel`}>
                                                    <p>19:45-20:45</p>
                                                </div>
                                                <SelectInput placeholder={"Другое время"} iconMiniArrow={{
                                                    height: 10,
                                                    width: 10
                                                }}  classDropDown={styles.orderSelect} classNameBlock={`${styles.inputSelectable} ${styles.timeSelect} whiteSelectable gap-5 f-1`} selectHandler={(selected) => {
                                                    console.log(selected)}}  items={["18:30", "19:30"]}/>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="f-column gap-20">
                                       <RadioInput selected={callNeeded} text={
                                           <p><b>Требуется</b> звонок оператора</p>
                                       } onSelect={() => {}}/>
                                        <RadioInput selected={!callNeeded} text={
                                            <p>Звонок оператора <b>не требуется</b></p>
                                        } onSelect={() => {}}/>
                                    </div>
                                </div>

                            </div>


                        </div>
                        <div className={`${styles.leftContent} orderBottom f-column gap-40`}>
                            <div className="f-column gap-20 paymentWay">
                                <div className="sectionTitle">Способы оплаты</div>
                                <div className="d-f gap-10">
                                    <div className={`${styles.inputSelectable} ${paymentWay == "CARD" ? "whiteSelectableSelected" : ""} d-f al-center gap-5 whiteSelectable`}>
                                        <PaymentCard/>
                                        <p>Картой онлайн</p>
                                    </div>
                                    <div className={`${styles.inputSelectable} ${paymentWay == "CASH" ? "whiteSelectableSelected" : ""} d-f al-center gap-5 whiteSelectable`}>
                                        <PaymentCash/>
                                        <p>Наличными</p>
                                    </div>
                                </div>
                            </div>
                            <div className="f-column gap-15">
                                <RedButton className={"pd-15"}>Оформить заказ на 1 023 ₽</RedButton>
                                <div className={"w-100p d-f jc-center"}>
                                    <b className={`${styles.backCart}`}>Вернуться в корзину</b>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};

export default Order;