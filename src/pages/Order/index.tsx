import React, {FC, useEffect, useState} from 'react';
import styles from './order.module.scss'
import InputWrapper from "../../components/Inputs/InputWrapper";
import {PaymentCard, PaymentCash} from "../../icons";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import RedButton from "../../components/Buttons/RedButton";
import RadioInput from "../../components/Inputs/RadioInput";
import SelectInput from "../../components/Inputs/SelectInput";
import {
    handleOrderCallNeeded,
    handleOrderFormVal,
    handleOrderPaymentWay,
    handleOrderPickup,
    handleOrderTime,
    handleSelectAddressId,
    handleSelectRestaurant,
    sendOrder, setOrderError, setOrderSuccess
} from "../../features/forms/formsSlice";
import {formatNumberWithSpaces} from "../../utils/numberWithSpaces";
import {domain} from "../../http/instance/instances";
import {getFromStorage} from "../../utils/LocalStorageExplorer";
import {CreateOrderRequest, Supplement} from "../../types/api.types";
import {formatPhoneNumber} from "../../utils/forms/formatePhone";
import List from "../../components/List";
import {handleCartOpened, handleNewAddress} from "../../features/modals/modalsSlice";
import {useInput} from "../../hooks/useInput";
import SuccessWindow from "../../components/Windows/SuccessWindow";
import {getAvailableTimes} from "../../utils/avaliableTimes";
import {Link} from "react-router-dom";

const orderTimes = getAvailableTimes()

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
    const dispatch = useAppDispatch()
    const {data, addresses} = useAppSelector(state => state.profile)
    const marketAddresses = useAppSelector(state => state.main.addresses)
    const cart = useAppSelector(state => state.cart)
    const [changeSum, setChangeSum, setStateSum] = useInput("")

    const {
        name,
        callNeeded,
        time,
        paymentWay,
        address,
        error,
        phone,
        isPickup,
        restaurant,
        success,
        addressId
    } = useAppSelector(state => state.forms.orderForm)

    const [deliveryPrice, setDeliveryPrice] = useState(isPickup ? 0 : 100)
    const restFromStorage = getFromStorage('order_form')?.restaurant
    const addressFromStorage = getFromStorage('order_form')?.addressId

    const closeSuccess = () => {
        setOrderSuccess(false)
        window.location.href = '/profile#orders'
    }

    const handleCreateOrder = () => {
        if(error.length) {
            setOrderError("")
        }
        const paymentTypeOrder =  paymentWay == "CARD" ? 1 : 2
        const timeDeliveryOrder = time == "FAST" ? "40 min" : time
        const deliveryTypeOrder = isPickup ? 3 : 2
        const changeWith = paymentWay == "CASH" ? Number(changeSum) : undefined
        const userAddressId = !isPickup ? addressId : undefined

        const req: CreateOrderRequest = {
            delivery_type: deliveryTypeOrder,
            is_call: callNeeded,
            marekt_adress_id: restaurant,
            pyment_type: paymentTypeOrder,
            time_delivery: timeDeliveryOrder,
            change_with: changeWith,
            user_adress_id: userAddressId
        }
        dispatch(sendOrder(req))
    }
    const handleCart = () => dispatch(handleCartOpened())

    useEffect(() => {
        dispatch(handleOrderFormVal({
            keyField: "name",
            val: data.name
        }))
    }, [])
    useEffect(() => {
        if(isPickup) {
            setDeliveryPrice(0)
            return;
        }
        setDeliveryPrice(100)
    }, [isPickup])

   //console.log(marketAddresses.length > 0 ? marketAddresses[0].id : -1)
    const getCurrentPickupAddress = () => {
        if(restFromStorage !== -1) {
            return restFromStorage
        }
        if(restaurant !== -1) {
            return restaurant
        }
        if(marketAddresses.length > 0) {
            return marketAddresses[0].id
        }
        return 0
    }
    const getCurrentDeliveryAddress = () => {
        if(addressFromStorage !== -1) {
            return addressFromStorage
        }
        if(addressId !== -1) {
            return addressId
        }
        if(addresses.length > 0) {
            return addresses[0].id
        }
        return 0
    }
    const handleChangeDeliveryType = () => {
        dispatch(handleOrderPickup())
        if(!isPickup) {
            dispatch(handleSelectRestaurant(getCurrentPickupAddress()))
        } else {
            dispatch(handleSelectAddressId(getCurrentDeliveryAddress()))

        }

    }

    const getDisabledBtn = () => {
        if(cart.totalPrice !== 0) {
            // Если вдруг не указан айди адреса, но выбрана доставка
            if(!isPickup && (addressId == 0 || addressId == -1)) {
                return true
            }
            if(isPickup && (restaurant == 0 || restaurant == -1)) {
                return true
            }
            return false
        }
        return true

    }
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
                                                    <div className={`${styles.deliverySelect} f-column gap-5`}>
                                                        {
                                                            addresses.length ?
                                                                <SelectInput
                                                                    defaultCurrent={addressId || addressFromStorage}
                                                                    className={styles.selectRestaurant}
                                                                    classDropDown={`miniScrollbar ${styles.selectRestaurantItems}`}
                                                                    labelText={"Выбор адреса доставки"}
                                                                    selectHandler={(selected) => {
                                                                        dispatch(handleSelectAddressId(selected))
                                                                    }}
                                                                    optionsSelect={{
                                                                        byId: true,
                                                                        keyField: "city"
                                                                    }}
                                                                    items={addresses}
                                                                /> : null
                                                        }
                                                        <div style={{fontSize: 14}} onClick={() => dispatch(handleNewAddress())} className={`${styles.wayOrderBtn} self-end d-f colorRed cur-pointer`}>
                                                            Добавить адрес
                                                        </div>
                                                    </div>
                                                     :
                                                    <SelectInput
                                                        defaultCurrent={getCurrentPickupAddress()}
                                                        className={styles.selectRestaurant}
                                                        classDropDown={`miniScrollbar ${styles.selectRestaurantItems}`}
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
                                        <b onClick={handleChangeDeliveryType}
                                           className={`${styles.wayOrderBtn} d-f colorRed cur-pointer`}>
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
                                                                 classDropDownWrapper={`miniScrollBar ${styles.orderDropdownWrapper}`}
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
                                                inputType={"number"}
                                                inputId={"changeWith"}
                                                grayBorderedClassName={`${styles.inputField} ${styles.inputChangeWith}`}
                                                setVal={(val) => setStateSum(val)}
                                                changeVal={(sum) => setChangeSum(sum)}
                                                inputVal={changeSum} placeholder={"1000"}
                                                inputClassName={styles.diffCashInput}
                                                labelText={
                                                    "Сдача с"
                                                }/>
                                            : null
                                    }
                                </div>
                                <div className="f-column gap-15">
                                    <div className="f-column gap-5">
                                        {
                                            error.length ?      <p style={{fontSize: 16}} className={"colorError"}>{error}</p> : null
                                        }

                                        <RedButton onClick={handleCreateOrder}
                                                   disabled={getDisabledBtn()}
                                                   className={`pd-15 ${styles.createOrderBtn}`}>Оформить заказ
                                            на {formatNumberWithSpaces(cart.totalPrice + deliveryPrice)} ₽</RedButton>
                                    </div>

                                    <div className={"w-100p d-f jc-center"}>

                                        <Link to={"/"} className={`${styles.backCart}`}>Вернуться в меню</Link>
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
                                                <p>{formatNumberWithSpaces(cart.totalPrice )} ₽</p>
                                            </div>
                                            <div className="f-row-betw">
                                                <p>Доставка</p>
                                                <p>{deliveryPrice} ₽</p>
                                            </div>
                                        </div>
                                        <div className="totalInfo">
                                            <div className="f-row-betw">
                                                <b>Сумма заказа</b>
                                                <b>{formatNumberWithSpaces(cart.totalPrice + deliveryPrice)} ₽</b>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <SuccessWindow
                bottomContent={<RedButton onClick={closeSuccess} className={`${styles.orderSuccessBtn} pd-10 w-100p`}>Принять</RedButton>}
                closeHandle={closeSuccess}
                isOpened={success}
                title={"Успешно заказано!"}/>
        </>
    );
};

export default Order;