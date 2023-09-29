import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loginOpened: false,
    bookingOpened: false
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
        }
    }
})

export const {handleBooking, handleLogin} = ModalsSlice.actions


export const modalsReducer = ModalsSlice.reducer