import {useAppDispatch, useAppSelector} from "../app/hooks";
import {useEffect, useState} from "react";
import {setOrderWarning} from "../features/main/mainSlice";
import {appConfig} from "../config/AppConfig";

type OrderDisabledHook = {
    orderDisabled: boolean
}
const useOrderDisabled = (): OrderDisabledHook => {
    const dispatch = useAppDispatch()
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
                if (canOrder) {
                    const addressSelected = (addressId !== 0 && addressId !== -1) // Удостоверяемся, что указан адрес доставки
                    if (addressSelected) {
                        const isCarDelivery = orderDetails.delivery_type === 2 //Доставка на машине
                        if (isCarDelivery) {
                            if (cart.totalPrice < appConfig.MIN_ORDER_DELIVERY_SUM) {
                                setDisabled(true)
                                dispatch(setOrderWarning({
                                    title: "Доставка недоступна",
                                    description: `Мы доставим ваш заказ от ${appConfig.MIN_ORDER_DELIVERY_SUM} ₽`
                                }))
                                return
                            }
                            setDisabled(false)
                            return;
                        }
                        setDisabled(false)
                        return;
                    }
                    dispatch(setOrderWarning({
                        title: "Доставка недоступна",
                        description: `Адрес доставки не выбран`
                    }))
                    setDisabled(true)
                    return;
                }
                dispatch(setOrderWarning({
                    title: "Заказ недоступен",
                    description: `Ваши товары находятся из разных магазинов!`
                }))
                setDisabled(true)
                return;
            }

            if (!canOrder) {
                dispatch(setOrderWarning({
                    title: "Заказ недоступен",
                    description: `Ваши товары находятся из разных магазинов!`
                }))
                setDisabled(true)
                return;
            }

            const pickupAddressSelected = restaurant !== 0 && restaurant !== -1

            if (pickupAddressSelected) {
                const pickupAddressesExist = pickupAddresses.length > 0
                if (!pickupAddressesExist && canOrder) {
                    dispatch(setOrderWarning({
                        title: "Самовывоз недоступен",
                        description: `Нет доступных точек для самовывоза`
                    }))
                    setDisabled(true)
                    return;
                }
                setDisabled(false)
                return;
            }
            dispatch(setOrderWarning({
                title: "Самовывоз недоступен",
                description: `Не выбран адрес`
            }))
            setDisabled(true)
            return;
        }
        dispatch(setOrderWarning({
            title: "Заказ недоступен",
            description: `Добавьте товары в корзину`
        }))
        setDisabled(true)

    }
    useEffect(getDisabledBtn, [
        cart.items,
        cart.totalPrice,
        pickupAddresses,
        canOrder,
        isPickup,
        addressId,
        restaurant,
        orderDetails])

    return {
        orderDisabled: disabled
    }
};

export default useOrderDisabled;