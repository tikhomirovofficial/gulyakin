import React, {FC, useEffect} from 'react';
import styles from './order.module.scss'
import InputWrapper from "../../components/Inputs/InputWrapper";
import {PaymentCard, PaymentCash} from "../../icons";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import RedButton from "../../components/Buttons/RedButton";
import RadioInput from "../../components/Inputs/RadioInput";
import SelectInput from "../../components/Inputs/SelectInput";
import {
    handleOrderCallNeeded,
    handleOrderFormEditing,
    handleOrderFormVal,
    handleOrderPaymentWay,
    handleOrderPickup,
    handleOrderTime,
    handleSelectRestaurant,
    sendOrder
} from "../../features/forms/formsSlice";
import {formatNumberWithSpaces} from "../../utils/numberWithSpaces";
import {TextField} from "../../components/Inputs/TextField";
import {domain} from "../../http/instance/instances";
import {getFromStorage} from "../../utils/LocalStorageExplorer";
import {CreateOrderRequest, Supplement} from "../../types/api.types";
import {formatPhoneNumber} from "../../utils/formatePhone";
import List from "../../components/List";

const orderTimes = ["18:30", "19:30"]

type OrderItemProps = {
    id: number,
    image: string,
    title: string,
    composition: string,
    price: number,
    count: number
    supplements?: Supplement[]
}
const OrderItem: FC<OrderItemProps> = ({image, id, title, supplements = [], count, price, composition}) => {
    const additivePrice = supplements.length > 0 ? supplements.reduce((a, b) => {
        return a + b.price
    }, 0) : 0
    return (
        <div className={`${styles.part} ${styles.product} pd-15 d-f gap-10`}>
            <div style={{backgroundImage: `url(${domain + "/" + image})`}}
                 className={`bg-cover ${styles.image}`}></div>
            <div className="f-column-betw f-1 gap-5">
                <div className="top f-column gap-5">
                    <h4>{title}</h4>
                    <p>{composition || "Описание отсутствует"}</p>
                    {
                        supplements.length > 0 ?
                            <p>+ {supplements.map(item => item.title).join(", ")}</p>
                            : null
                    }
                </div>
                <b className={styles.price}>{formatNumberWithSpaces((price + additivePrice) * count)} ₽</b>
            </div>
        </div>
    )
}
const Order = () => {
    const {data, addresses} = useAppSelector(state => state.profile)
    const marketAddresses = useAppSelector(state => state.main.addresses)
    const cart = useAppSelector(state => state.cart)
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
    const storageFromRest = getFromStorage('order_form')?.restaurant

    const handleCreateOrder = () => {
        const req: CreateOrderRequest = {
            delivery_type: 3,
            is_call: callNeeded,
            marekt_adress_id: restaurant,
            pyment_type: paymentWay == "CARD" ? 1 : 2,
            time_delivery: time == "FAST" ? "40 min" : time,
        }
        dispatch(sendOrder(req))
    }

    useEffect(() => {
        console.log(marketAddresses)
        console.log(restaurant)
        dispatch(handleOrderFormVal({
            keyField: "name",
            val: data.name
        }))
        console.log(getFromStorage('order_form')?.restaurant ? getFromStorage('order_form')?.restaurant : marketAddresses.length > 0 ? marketAddresses.findIndex(item => item.id == restaurant) : -1)
        console.log(marketAddresses.length > 0 ? restaurant : 0)
    }, [])

    return (
        <>
            <div className={styles.order}>
                <div className="wrapper">
                    <div className={`${styles.orderContainer} d-f jc-between gap-80`}>
                        <div className="orderBlock f-column gap-40">
                            <div className={`${styles.form} f-column gap-25`}>
                                <div className="sectionTitle">Заказ на {!isPickup ? "доставку" : "самовывоз"}</div>
                                <div className="f-column gap-20">
                                    <div className="f-column gap-10">
                                        <div className="orderForm f-column gap-20">
                                            <InputWrapper
                                                setVal={val => dispatch(handleOrderFormVal({
                                                    keyField: "name",
                                                    val: val
                                                }))}
                                                changeVal={e => dispatch(handleOrderFormVal({
                                                    keyField: "name",
                                                    val: e.target.value
                                                }))}
                                                grayBorderedClassName={styles.inputField}
                                                inputVal={name.val}
                                                placeholder={"Иван"}
                                                labelText={"Ваше имя"}
                                            />
                                            {/*<TextField*/}
                                            {/*    handleSave={() => {}}*/}
                                            {/*    className={styles.inputField}*/}
                                            {/*    placeholder={"Иван"}*/}
                                            {/*    labelText={"Ваше имя"}*/}
                                            {/*    isEditing={name.isEditing}*/}
                                            {/*    formValue={name.val}*/}
                                            {/*    condValue={data.name}*/}
                                            {/*    handleEdit={() => {*/}
                                            {/*        dispatch(handleOrderFormEditing("name"))*/}
                                            {/*    }}*/}
                                            {/*    onInputFocus={() => {*/}
                                            {/*        dispatch(handleOrderFormEditing("name"))*/}
                                            {/*    }}*/}
                                            {/*    onInputBlur={() => {*/}
                                            {/*        dispatch(handleOrderFormEditing("name"))*/}
                                            {/*        dispatch(handleOrderFormVal({keyField: "name", val: data.name}))*/}
                                            {/*    }}*/}
                                            {/*    setVal={val => dispatch(handleOrderFormVal({keyField: "name", val: val}))}*/}
                                            {/*    changeVal={e => dispatch(handleOrderFormVal({keyField: "name", val: e.target.value}))}*/}
                                            {/*/>*/}
                                            <InputWrapper disabled={true} inActive={true}
                                                          grayBorderedClassName={styles.inputField}
                                                          locked={true}
                                                          inputVal={formatPhoneNumber(data.phone)}
                                                          placeholder={"Номер телефона"}
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
                                                    <SelectInput
                                                        defaultCurrent={storageFromRest || restaurant}
                                                        className={styles.selectRestaurant}
                                                        classDropDown={styles.selectRestaurantItems}
                                                        labelText={"Выберите ресторан (обязательно)"}
                                                        selectHandler={(selected) => {
                                                            dispatch(handleSelectRestaurant(selected))
                                                        }}
                                                        optionsSelect={{
                                                            byId: true,
                                                            keyField: "adress"
                                                        }}
                                                        items={marketAddresses}
                                                    />

                                            }


                                        </div>
                                        <b onClick={() => dispatch(handleOrderPickup())}
                                           className={`${styles.wayOrderBtn} d-n colorRed cur-pointer`}>
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
                                                        <p>Через ~40 мин</p>
                                                    </div>
                                                    <SelectInput placeholder={"Другое время"} iconMiniArrow={{
                                                        height: 10,
                                                        width: 10
                                                    }} classDropDown={styles.orderSelect}
                                                                 classDropDownWrapper={styles.orderDropdownWrapper}
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
                                            className={`${styles.inputSelectable} ${paymentWay == "CASH" ? "whiteSelectableSelected" : ""} d-n al-center gap-5 whiteSelectable`}>
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
                                    <RedButton onClick={handleCreateOrder}
                                               disabled={!(address.val.length > 0) && !(cart.totalPrice > 0)}
                                               className={"pd-15"}>Оформить заказ
                                        на {formatNumberWithSpaces(cart.totalPrice)} ₽</RedButton>
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
                                    <List
                                        listBlockClassname={`${styles.productList} f-column gap-5`}
                                        list={cart.items}
                                        renderItem={(item => (
                                            <OrderItem
                                                supplements={item.supplements}
                                                id={item.product.id}
                                                image={item.product.image}
                                                title={item.product.title}
                                                composition={item.product.composition}
                                                price={item.product.price}
                                                count={item.count}/>
                                        ))}
                                    />
                                    <div className={`${styles.info} ${styles.part} pd-15 f-column gap-10`}>
                                        <div className={`${styles.productsInfo} f-column gap-5`}>
                                            <div className="f-row-betw">
                                                <p>{cart.items.length} товаров</p>
                                                <p>{formatNumberWithSpaces(cart.totalPrice)} ₽</p>
                                            </div>
                                            <div className="f-row-betw">
                                                <p>Доставка</p>
                                                <p>0 ₽</p>
                                            </div>
                                        </div>
                                        <div className="totalInfo">
                                            <div className="f-row-betw">
                                                <b>Сумма заказа</b>
                                                <b>{formatNumberWithSpaces(cart.totalPrice)} ₽</b>
                                            </div>

                                        </div>
                                    </div>
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