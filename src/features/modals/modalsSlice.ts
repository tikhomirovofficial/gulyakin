import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProductAdditiveData} from "../../types/products.types";
import {getImgPath} from "../../utils/getAssetsPath";
import {addToStorage, getFromStorage} from "../../utils/LocalStorageExplorer";

type ModalSliceState = {
    loginOpened: boolean,
    bookingOpened: boolean,
    yourAddress: boolean,
    productAdditives: boolean,
    cookiesAccepted: boolean,
    deliveryWay: {
        opened: boolean
        variant: number
    },
    newAddress: boolean,
    productAdditivesData: ProductAdditiveData,
    cartOpened: boolean
}

const initialState: ModalSliceState = {
    loginOpened: false,
    bookingOpened: false,
    yourAddress: false,
    productAdditives: false,
    cookiesAccepted: getFromStorage("cookie_accepted") || false,
    deliveryWay: {
        opened: false,
        variant: 0
    },
    cartOpened: false,
    newAddress: false,
    productAdditivesData: {
        id: 0,
        description: "",
        imageUrl: "",
        name: "",
        price: 0,
        weight: 0,
        currentAdditive: 0,
        additives: [
        ],

    }


}

export const ModalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        handleCookieAccepted: (state) => {
            if(!state.cookiesAccepted) {
                state.cookiesAccepted = !state.cookiesAccepted
                addToStorage("cookie_accepted", true)
            }
        },
        handleBooking: (state) => {
            state.bookingOpened = !state.bookingOpened
        },
        handleCartOpened: (state) => {
            state.cartOpened = !state.cartOpened
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
        handleDeliveryWayWindow: (state) => {
            state.deliveryWay = {
                opened: !state.deliveryWay.opened,
                variant: state.deliveryWay.variant
            }
        },
        handleDeliveryVariant: (state, action: PayloadAction<number>) => {
            state.deliveryWay = {
                opened: state.deliveryWay.opened,
                variant: action.payload
            }
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
    handleDeliveryWayWindow,
    handleDeliveryVariant,
    handleNewAddress,
    handleCartOpened,
} = ModalsSlice.actions


export const modalsReducer = ModalsSlice.reducer