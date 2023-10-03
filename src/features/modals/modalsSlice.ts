import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loginOpened: false,
    bookingOpened: false,
    yourAddress: true
}

export const ModalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        handleBooking: (state) => {
            state.bookingOpened = !state.bookingOpened
        },
        handleLogin: (state) => {
            state.loginOpened = !state.loginOpened
        },
        handleYourAddress: state => {
            state.yourAddress = !state.yourAddress
        }
    }
})

export const {handleBooking, handleLogin, handleYourAddress} = ModalsSlice.actions


export const modalsReducer = ModalsSlice.reducer