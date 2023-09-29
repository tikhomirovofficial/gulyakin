import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    cities: ["Сургут", "Сочи", "Нижневартовск"],
    changingGeo: false,
    askCityVisible: true,
    currentGeo: {
        city: 1
    }
}



export const MainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setCurrentCity: (state, action : PayloadAction<number>) => {
            state.currentGeo.city = action.payload
        },
        toggleChangingGeo: (state) => {
            state.changingGeo = !state.changingGeo
        },
        toggleAskCityVisible: (state) => {
            state.askCityVisible = !state.askCityVisible
        },

    }
})

export const {setCurrentCity, toggleChangingGeo, toggleAskCityVisible} = MainSlice.actions


export const mainReducer = MainSlice.reducer