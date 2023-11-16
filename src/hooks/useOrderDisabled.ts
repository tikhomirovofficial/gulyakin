import React from 'react';
import {useAppSelector} from "../app/hooks";

const useOrderDisabled = () => {
    const {
        isPickup,
        restaurant,
        addressId
    } = useAppSelector(state => state.forms.orderForm)
    const {orderDetails, pickupAddresses, canOrder} = useAppSelector(state => state.main)
    const cart = useAppSelector(state => state.cart)

    const getDisabledBtn = () => {
        const cartFilled = cart.items.length !== 0
        if (cartFilled) {
            if(!canOrder) {
                // ПРЕДУПРЕЖДЕНИЕ: НЕТ ДОСТУПНОСТИ ЗАКАЗАТЬ В РАЗНЫХ КОНЦЕПЦИЯХ
                return true
            }
            if(!isPickup) {
                const addressSelected = (addressId == 0 || addressId == -1) // Удостоверяемся, что указан адрес доставки
                if(addressSelected) {
                    const isCarDelivery = orderDetails.delivery_type === 2 //Доставка на машине
                    if(isCarDelivery) {
                        if(cart.totalPrice < 700) {
                            // ПРЕДУПРЕЖДЕНИЕ: СУММА ЗАКАЗА МЕНЬШЕ 700
                            return true
                        }
                        return false
                    }
                    return false
                }
                return true
            }

            const pickupAddressSelected = restaurant == 0 || restaurant == -1

            if(pickupAddressSelected) {
                const pickupAddressesExist = pickupAddresses.length > 0
                if(!pickupAddressesExist) {
                    // ПРЕДУПРЕЖДЕНИЕ: НЕТ АДРЕСОВ ДЛЯ САМОВЫВОЗА В ГОРОДЕ
                    return true
                }
                return false
            }
            return true
        }
        //ПРЕДУПРЕЖДЕНИЕ: КОРЗИНА ПУСТА
        return true

    }
};

export default useOrderDisabled;