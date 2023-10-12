import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProductAdditiveData} from "../../types/products.types";
import {getImgPath} from "../../utils/getAssetsPath";

type ModalSliceState = {
    loginOpened: boolean,
    bookingOpened: boolean,
    yourAddress: boolean,
    productAdditives: boolean,
    cookiesAccepted: boolean,
    deliveryWay: boolean,
    newAddress: boolean,
    productAdditivesData: ProductAdditiveData
}

const initialState: ModalSliceState = {
    loginOpened: false,
    bookingOpened: false,
    yourAddress: false,
    productAdditives: false,
    cookiesAccepted: true,
    deliveryWay: false,
    newAddress: false,
    productAdditivesData: {
        description: "Куриное филе, ветчина, бекон, огурцы маринованные,соус тар-тар, томаты, моцарелла, сыр гауда, чеддер",
        imageUrl: getImgPath('productCard.png'),
        name: "Блин деревнский топ",
        price: 0,
        weight: 250,
        currentAdditive: 0,
        additives: [
            {
                imageUrl: getImgPath('productAdditive.png'),
                name: "Соус 1",
                price: 49,
            },
            {
                imageUrl: getImgPath('productAdditive.png'),
                name: "Соус 2",
                price: 69,
            }
        ],

    }


}

export const ModalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        handleCookieAccepted: (state) => {
            state.cookiesAccepted = !state.cookiesAccepted

        },
        handleBooking: (state) => {
            state.bookingOpened = !state.bookingOpened
        },
        handleLogin: (state) => {
            state.loginOpened = !state.loginOpened
        },
        handleYourAddress: state => {
            state.yourAddress = !state.yourAddress
        },
        handleProductAdditives: state => {
            state.productAdditives = !state.productAdditives
        },
        handleNewAddress: state => {
          state.newAddress = !state.newAddress
        },
        handleDeliveryWay: (state) => {
            state.deliveryWay = !state.deliveryWay
        },
        setProductAdditivesData: (state, action: PayloadAction<ProductAdditiveData>) => {
            state.productAdditivesData = action.payload
        }

    }
})

export const {
    handleBooking,
    handleLogin,
    handleYourAddress,
    handleProductAdditives,
    setProductAdditivesData,
    handleCookieAccepted,
    handleDeliveryWay,
    handleNewAddress,
} = ModalsSlice.actions


export const modalsReducer = ModalsSlice.reducer