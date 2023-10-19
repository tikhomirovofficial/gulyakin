import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addToStorage, getFromStorage} from "../../utils/LocalStorageExplorer";


const initialState = {
    tempPage: 0,
    market: 0,
    cities: ["Сургут", "Сочи", "Нижневартовск"],
    changingGeo: false,
    askCityVisible: !(getFromStorage("city") !== undefined && getFromStorage("city") !== null),
    currentGeo: {
        city: getFromStorage("city") || 0
    }
}

export const MainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setTempPage: (state, action) => {
            state.tempPage = action.payload
        },
        setCurrentCity: (state, action : PayloadAction<number>) => {
            state.currentGeo.city = action.payload
            addToStorage("city", action.payload)

        },
        toggleChangingGeo: (state) => {
            state.changingGeo = !state.changingGeo
        },
        toggleAskCityVisible: (state) => {
            state.askCityVisible = !state.askCityVisible
        },
        setMarket: (state, action: PayloadAction<number>) => {
            state.market = action.payload
        }

    }
})

export const {setCurrentCity, toggleChangingGeo, toggleAskCityVisible, setTempPage, setMarket} = MainSlice.actions


export const mainReducer = MainSlice.reducer