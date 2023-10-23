import React from 'react';
import Header from "../../components/Header";
import styles from './order.module.scss'
import LogosSection from "../../components/LogosSection";
import InputWrapper from "../../components/Inputs/InputWrapper";
import {PaymentCard, PaymentCash} from "../../icons";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import RedButton from "../../components/Buttons/RedButton";
import RadioInput from "../../components/Inputs/RadioInput";
import SelectInput from "../../components/Inputs/SelectInput";
import Footer from "../../components/Footer";
import {
    handleOrderCallNeeded,
    handleOrderFormEditing,
    handleOrderFormVal,
    handleOrderPaymentWay,
    handleOrderPickup,
    handleOrderTime,
    handleSelectRestaurant
} from "../../features/forms/formsSlice";
import {formatNumberWithSpaces} from "../../utils/numberWithSpaces";
import {TextField} from "../../components/Inputs/TextField";
import {getImgPath} from "../../utils/getAssetsPath";

const orderTimes = ["18:30", "19:30"]


const Order = () => {
    const {data, addresses} = useAppSelector(state => state.profile)
    const {totalPrice} = useAppSelector(state => state.cart)
    const {
        name,
        callNeeded,
        time,
        paymentWay,
        address,
        phone,
        isPickup,
        restaurant
    } = useAppSelector(state => state.forms.orderForm)

    const dispatch = useAppDispatch()
    return (
        <>
            <Header/>
            <LogosSection/>
            <div className={styles.order}>
                <div className="wrapper">
                    <div className="orderContainer d-f jc-between gap-80">
                        <div className="orderBlock f-column gap-40">
                            <div className={`${styles.form} f-column gap-25`}>
                                <div className="sectionTitle">Заказ на {!isPickup ? "доставку" : "самовывоз"}</div>
                                <div className="f-column gap-20">
                                    <div className="f-column gap-10">
                                        <div className="orderForm f-column gap-20">
                                            <InputWrapper
                                                className={styles.inputField}
                                                grayBorderedClassName={styles.inputField}
                                                setVal={val => dispatch(handleOrderFormVal({
                                                    keyField: "name",
                                                    val: val
                                                }))}
                                                changeVal={e => dispatch(handleOrderFormVal({
                                                    keyField: "name",
                                                    val: e.target.value
                                                }))}
                                                inputVal={name.val} placeholder={"Иван"}
                                                labelText={
                                                    "Ваше имя"
                                                }/>
                                            <InputWrapper disabled={true} inActive={true}
                                                          grayBorderedClassName={styles.inputField}
                                                          locked={true}
                                                          inputVal={phone} placeholder={"Номер телефона"}
                                                          labelText={
                                                              "Номер телефона"
                                                          }/>
                                            {
                                                !isPickup ?
                                                    <TextField
                                                        handleSave={() => alert("Сохраняем")}
                                                        className={`${styles.inputField} ${styles.textAreaField}`}
                                                        placeholder={"Адрес"}
                                                        labelText={"Адрес доставки"}
                                                        isTextArea={true}
                                                        isEditing={address.isEditing}
                                                        formValue={address.val}
                                                        condValue={address.val}
                                                        textChangeVal={e => dispatch(handleOrderFormVal({
                                                            keyField: "address",
                                                            val: e.target.value
                                                        }))}
                                                        handleEdit={() => {
                                                            dispatch(handleOrderFormEditing("address"))
                                                        }}
                                                        onInputFocus={() => {
                                                            dispatch(handleOrderFormEditing("address"))
                                                        }}
                                                        onInputBlur={() => {
                                                            dispatch(handleOrderFormEditing("address"))
                                                        }}
                                                        setVal={val => dispatch(handleOrderFormVal({
                                                            keyField: "address",
                                                            val: val
                                                        }))}
                                                        changeVal={e => dispatch(handleOrderFormVal({
                                                            keyField: "address",
                                                            val: e.target.value
                                                        }))}
                                                    /> :
                                                    <SelectInput defaultCurrent={restaurant}
                                                                 className={styles.selectRestaurant}
                                                                 labelText={"Выберите ресторан (обязательно)"}
                                                                 selectHandler={(selected) => {
                                                                     dispatch(handleSelectRestaurant(selected))
                                                                 }}
                                                                 items={["первый", "второй"]
                                                                 }/>

                                            }


                                        </div>
                                        <b onClick={() => dispatch(handleOrderPickup())}
                                           className={`${styles.wayOrderBtn} colorRed cur-pointer`}>
                                            {isPickup ? "Выбрать доставку" : "Выбрать самовывоз"}
                                        </b>
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
                                    {
                                        paymentWay == "CASH" ?
                                            <InputWrapper
                                                className={styles.inputField}
                                                postFix={"₽"}
                                                grayBorderedClassName={styles.inputField}
                                                setVal={val => dispatch(handleOrderFormVal({
                                                    keyField: "name",
                                                    val: val
                                                }))}
                                                changeVal={e => dispatch(handleOrderFormVal({
                                                    keyField: "name",
                                                    val: e.target.value
                                                }))}
                                                inputVal={name.val} placeholder={"1000"}
                                                inputClassName={styles.diffCashInput}
                                                labelText={
                                                    "Сдача с"
                                                }/>
                                            : null
                                    }
                                </div>
                                <div className="f-column gap-15">
                                    <RedButton disabled={!(address.val.length > 0) && !(totalPrice > 0)}
                                               className={"pd-15"}>Оформить заказ
                                        на {formatNumberWithSpaces(totalPrice)} ₽</RedButton>
                                    <div className={"w-100p d-f jc-center"}>
                                        <b className={`${styles.backCart}`}>Вернуться в корзину</b>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div className="compositionBlock f-07 ">
                            <div className={`${styles.compositionOrder} bg-white f-column gap-20`}>
                                <h3>Состав заказа</h3>
                                <div className="f-column gap-5">
                                    <div className="productList f-column gap-5">
                                        <div className={`${styles.part} ${styles.product} pd-15 d-f gap-10`}>
                                            <div style={{backgroundImage: `url(${getImgPath("product.jpg")})`}}
                                                 className={`bg-cover ${styles.image}`}></div>
                                            <div className="f-column-betw f-1">
                                                <div className="top">
                                                    <h4>Пельмени с говядиной</h4>
                                                    <p>Свинина, говядина</p>
                                                </div>
                                                <b className={styles.price}>473 ₽</b>
                                            </div>
                                        </div>
                                        <div className={`${styles.part} ${styles.product} pd-15 d-f gap-10`}>
                                            <div style={{backgroundImage: `url(${getImgPath("product.jpg")})`}}
                                                 className={`bg-cover ${styles.image}`}></div>
                                            <div className="f-column-betw f-1">
                                                <div className="top">
                                                    <h4>Пельмени с говядиной</h4>
                                                    <p>Свинина, говядина</p>
                                                </div>
                                                <b className={styles.price}>473 ₽</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.info} ${styles.part} pd-15 f-column gap-10`}>
                                        <div className={`${styles.productsInfo} f-column gap-5`}>
                                            <div className="f-row-betw">
                                                <p>5 товаров</p>
                                                <p>{formatNumberWithSpaces(totalPrice)} ₽</p>
                                            </div>
                                            <div className="f-row-betw">
                                                <p>Доставка</p>
                                                <p>100 ₽</p>
                                            </div>
                                        </div>
                                        <div className="totalInfo">
                                            <div className="f-row-betw">
                                                <b>Сумма заказа</b>
                                                <b>{formatNumberWithSpaces(totalPrice)} ₽</b>
                                            </div>

                                        </div>
                                    </div>
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