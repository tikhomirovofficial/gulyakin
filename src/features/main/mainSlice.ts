import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addToStorage, getFromStorage} from "../../utils/LocalStorageExplorer";
import {AxiosResponse} from "axios";
import {
    AddressByMarketCity,
    GetAddressesByMarketCityRequest,
    GetAddressesByMarketCityResponse,
    GetCitiesResponse
} from "../../types/api.types";
import {AddressesApi} from "../../http/api/addresses.api";

type Market = {
    title: string,
    id: number
}
type MainSliceState = {
    market: number,
    cities: Array<{
        id: number,
        name: string
    }>
    changingGeo: boolean,
    addresses: Array<AddressByMarketCity>
    askCityVisible: boolean,
    currentGeo: {
        city: number
    }
    isMobile: boolean
    isPhone: boolean,
    markets: Array<Market>

}
const initialState: MainSliceState = {
    market: getFromStorage('market') || -1,
    cities: [],
    changingGeo: false,
    addresses: [],
    isMobile: false,
    isPhone: false,
    askCityVisible: !(getFromStorage("city_accepted") !== undefined && getFromStorage("city_accepted") !== null),
    currentGeo: {
        city: getFromStorage("city") || 0
    },
    markets: [
        {
            id: 2,
            title: "Гулякин"
        },
        {
            id: 3,
            title: "Гуленьки Пельменная"
        },
        {
            id: 4,
            title: "Гуленьки блинная"
        }
    ]
}
export const getCities = createAsyncThunk(
    'cities/get',
    async (_, {dispatch}) => {
        const res: AxiosResponse<GetCitiesResponse> = await AddressesApi.Cities()
        if(res.data.siti.length) {
            return {
                cities: res.data.siti
            }
        }

        return {
            cities: []
        }

    }
)
export const getAddressesByMarketCity = createAsyncThunk(
    'addresses/get',
    async (request: GetAddressesByMarketCityRequest, {dispatch}) => {
        const res: AxiosResponse<GetAddressesByMarketCityResponse> = await AddressesApi.AddressInfoByCityAndMarketId(request)
        return res.data.adress

    }
)
export const MainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setCurrentCity: (state, action: PayloadAction<number>) => {
            state.currentGeo.city = action.payload
            addToStorage("city", action.payload)
            if(!getFromStorage("city_accepted")) {
                addToStorage("city_accepted", true)
            }
        },
        toggleChangingGeo: (state) => {
            state.changingGeo = !state.changingGeo
        },
        toggleAskCityVisible: (state) => {
            state.askCityVisible = !state.askCityVisible
        },
        setMarket: (state, action: PayloadAction<number>) => {
            state.market = action.payload
        },
        setIsMobile: (state, action: PayloadAction<boolean>) => {
            state.isMobile = action.payload
        },
        setIsPhone: (state, action: PayloadAction<boolean>) => {
            state.isPhone = action.payload
        },

    },
    extraReducers: builder => {
        builder.addCase(getCities.fulfilled, (state, action) => {
            state.cities = action.payload.cities
            if(!state.currentGeo.city) {
                state.currentGeo.city = action.payload.cities[0].id
            }
        })
        builder.addCase(getCities.rejected, (state, action) => {

        })
        builder.addCase(getCities.pending, (state, action) => {

        })
        builder.addCase(getAddressesByMarketCity.fulfilled, (state, action) => {
            state.addresses = action.payload
        })
        builder.addCase(getAddressesByMarketCity.rejected, (state, action) => {

        })
        builder.addCase(getAddressesByMarketCity.pending, (state, action) => {

        })
    }
})

export const {setCurrentCity, setIsMobile, setIsPhone, toggleChangingGeo, toggleAskCityVisible, setMarket} = MainSlice.actions


export const mainReducer = MainSlice.reducer