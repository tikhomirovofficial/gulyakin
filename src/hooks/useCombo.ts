import React from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import useToken from "./useToken";
import useCartAdd from "./useCartAdd";
import {
    handleLogin,
    handleProductAdditives,
    handleYourAddress,
    setChangingAdditivesMode, setProductAdditivesData
} from "../features/modals/modalsSlice";
import {addToCart, addToCartCombo, setProductAfterAddress} from "../features/cart/cartSlice";
import {AddToCartCombo, AddToCartComboRequest, Combo} from "../types/api.types";

const useCombo = (combo_id: number): [(selectedProduct: number) => void, () => void, Combo] => {
    const dispatch = useAppDispatch()
    const token = useToken()
    const handleAddedPopup = useCartAdd()

    const {address, restaurant} = useAppSelector(state => state.forms.orderForm)
    const {combos} = useAppSelector(state => state.products)
    const cart = useAppSelector(state => state.cart.items)

    const thisCombo = combos.filter(prodItem => prodItem.id === combo_id)[0]

    const handleAddToCart = (selectedProduct: number) => {
        handleSetAdditivesData()
        dispatch(handleProductAdditives())
        const comboDefferedData = {id: combo_id, is_combo: true}
        if (token) {
            const deliveryIsDefined = address.val.length > 0 || restaurant !== -1
            if (deliveryIsDefined) {
                const comboAddRequest: AddToCartComboRequest = {
                    combo: [
                        {
                            id: combo_id,
                            selected_product: selectedProduct,
                            count: 1
                        }
                    ],
                    combo_prod: thisCombo
                }
                dispatch(addToCartCombo(comboAddRequest))
                handleAddedPopup(thisCombo.title, thisCombo.weight)
                dispatch(handleProductAdditives())
                return;
            }
            dispatch(setProductAfterAddress(comboDefferedData))
            dispatch(handleYourAddress())
            dispatch(handleProductAdditives())
            return
        }
        dispatch(setProductAfterAddress(comboDefferedData))
        dispatch(handleLogin())
        dispatch(handleProductAdditives())

    }
    const handleSetAdditivesData = () => {
        dispatch(setProductAdditivesData({
            id: combo_id,
            additives: [],
            currentAdditive: 0,
            description: thisCombo.products?.map(item => item.title).join(', ') || "Описания нет",
            imageUrl: thisCombo.image || "",
            is_combo: true,
            name: thisCombo.title,
            price: thisCombo.price || 0,
            weight: thisCombo.weight

        }))
        dispatch(handleProductAdditives())
    }
    const handleOpenComboWindow = () => {
        const addedToCart = cart.some(item => item.product.id === combo_id && item.is_combo)
        if (addedToCart) {
            dispatch(setChangingAdditivesMode(true))
            handleSetAdditivesData()
            return;
        }
        handleSetAdditivesData()
        return;
    }
    return [handleAddToCart, handleOpenComboWindow, thisCombo]
};

export default useCombo;