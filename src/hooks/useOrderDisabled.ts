import {useAppSelector} from "../app/hooks";
import {useEffect, useState} from "react";
import {setOrderWarning} from "../features/main/mainSlice";

type OrderDisabledHook = {
    orderDisabled: boolean
}
const useOrderDisabled = (): OrderDisabledHook => {
    const {
        isPickup,
        restaurant,
        addressId
    } = useAppSelector(state => state.forms.orderForm)
    const {orderDetails, pickupAddresses, canOrder} = useAppSelector(state => state.main)
    const cart = useAppSelector(state => state.cart)

    const [disabled, setDisabled] = useState(false)


    const getDisabledBtn = () => {
        const cartFilled = cart.items.length !== 0

        if (cartFilled) {
            if (!isPickup) {
                if(canOrder) {
                    const addressSelected = (addressId !== 0 && addressId !== -1) // Удостоверяемся, что указан адрес доставки
                    if (addressSelected) {
                        const isCarDelivery = orderDetails.delivery_type === 2 //Доставка на машине
                        if (isCarDelivery) {
                            if (cart.totalPrice < 700) {
                                setDisabled(true)
                                setOrderWarning({
                                    description: "", title: ""

                                })
                                console.log("СУММА ЗАКАЗА МЕНЬШЕ 700")
                                return
                            }
                            setDisabled(false)
                            return;
                        }
                        setDisabled(false)
                        return;
                    }
                    console.log("НЕ ВЫБРАН АДРЕС ДОСТАВКИ")
                    setDisabled(true)
                    return;
                }
                console.log("НЕТ ДОСТУПНОСТИ ЗАКАЗАТЬ В РАЗНЫХ КОНЦЕПЦИЯХ")
                setDisabled(true)
                return;
            }

            if (!canOrder) {
                console.log("НЕТ ДОСТУПНОСТИ ЗАКАЗАТЬ В РАЗНЫХ КОНЦЕПЦИЯХ")
                setDisabled(true)
                return;
            }


            const pickupAddressSelected = restaurant !== 0 && restaurant !== -1

            if (pickupAddressSelected) {
                const pickupAddressesExist = pickupAddresses.length > 0
                if (!pickupAddressesExist && canOrder) {
                    console.log("НЕТ АДРЕСОВ ДЛЯ САМОВЫВОЗА")
                    setDisabled(true)
                    return;
                }
                setDisabled(false)
                return;
            }
            console.log("НЕ ВЫБРАН АДРЕС САМОВЫВОЗА")
            setDisabled(true)
            return;
        }
        console.log("КОРЗИНА ПУСТА")
        setDisabled(true)

    }
    useEffect(getDisabledBtn, [cart.items, cart.totalPrice, pickupAddresses, canOrder, isPickup, addressId, restaurant, orderDetails])

    useEffect(() => {

        // if(cart.items.length > 0    ) {
        //     console.log("###############")
        //     console.log("Блокирована кнопка: ", disabled)
        //     console.log(`Кол-во элементов в корзине ${cart.items.length}`)
        //     console.log(`Сумма заказа ${cart.totalPrice}`)
        //     console.log(`Кол-во адресов самовывоза ${pickupAddresses.length}`)
        //     console.log(`Доступность заказа ${canOrder}`)
        //     console.log(`Режим доставки: ${isPickup ? "Самовывоз" : "Доставка" }`)
        //     console.log(`Выбран адрес доставки: ${addressId}`)
        //     console.log(`Выбран адрес самовывоза: ${restaurant}`)
        //     console.log("###############")
        // }

    }, [cart.items, pickupAddresses, canOrder, isPickup, addressId, restaurant])

    return {
        orderDisabled: disabled
    }
};

export default useOrderDisabled;