import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addToStorage, getFromStorage} from "../../utils/LocalStorageExplorer";
import {AxiosResponse} from "axios";
import {
    AddressByMarketCity, BookingCreateRequest, BookingCreateResponse,
    GetAddressesByMarketCityRequest,
    GetAddressesByMarketCityResponse, GetBookingsRequest, GetBookingsResponse,
    GetCitiesResponse, GetDeliveryListResponse, GetPaymentListResponse
} from "../../types/api.types";
import {AddressesApi} from "../../http/api/addresses.api";
import {OrderApi} from "../../http/api/order.api";

type Market = {
    title: string,
    id: number
}
type VariantType = {
    title: string,
    id: number
}
type AddressType = {
    id: number,
    adress: string
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
    payments: VariantType[],
    deliveryTypes: VariantType[],
    bookingAddresses: AddressType[],
    bookingSuccess: boolean

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
    payments: [],
    deliveryTypes: [],
    bookingAddresses: [],
    bookingSuccess: false,
    markets: [
        {
            id: 2,
            title: "Гуленьки Пельменная"
        },
        {
            id: 3,
            title: "Гуленьки Блинная"
        },
        {
            id: 4,
            title: "IFOOD"
        },
        {
            id: 5,
            title: "Фудхолл"
        },
        {
            id: 6,
            title: "Воробушек"
        },
        {
            id: 7,
            title: "GUSTO"
        },
        {
            id: 8,
            title: "Креветочная"
        },
        {
            id: 9,
            title: "Гулибули"
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
export const getDeliveries = createAsyncThunk(
    'deliveries/get',
    async (_, {dispatch}) => {
        const res: AxiosResponse<GetDeliveryListResponse> = await OrderApi.DeliveriesWays()
        return res.data.delivery_list

    }
)
export const getBookings = createAsyncThunk(
    'bookings/get',
    async (request: GetBookingsRequest, {dispatch}) => {
        const res: AxiosResponse<GetBookingsResponse> = await AddressesApi.Bookings(request)
        return res.data.booking

    }
)
export const createBooking = createAsyncThunk(
    'booking/create',
    async (request: BookingCreateRequest, {dispatch}) => {
        const res: AxiosResponse<BookingCreateResponse> = await AddressesApi.CreateBooking(request)
        return res.data

    }
)
export const getPayments = createAsyncThunk(
    'payments/get',
    async (_, {dispatch}) => {
        const res: AxiosResponse<GetPaymentListResponse> = await OrderApi.PaymentsWays()
        return res.data.payment_list

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
        setIsBookingsSuccess: (state, action: PayloadAction<boolean>) => {
            state.bookingSuccess = action.payload
        }

    },
    extraReducers: builder => {
        builder.addCase(getCities.fulfilled, (state, action) => {
            state.cities = action.payload.cities
            if(!state.currentGeo.city) {
                state.currentGeo.city = action.payload.cities[0].id
            }
        })
        builder.addCase(getAddressesByMarketCity.fulfilled, (state, action) => {
            state.addresses = action.payload
        })
        builder.addCase(getDeliveries.fulfilled, (state, action) => {
            state.deliveryTypes = action.payload
        })
        builder.addCase(getBookings.fulfilled, (state, action) => {
            state.bookingAddresses = action.payload
        })
        builder.addCase(createBooking.fulfilled, (state, action) => {
            state.bookingSuccess = true
        })
        builder.addCase(getPayments.fulfilled, (state, action) => {
            state.payments = action.payload
        })

    }
})

export const {setCurrentCity, setIsMobile, setIsPhone, toggleChangingGeo, toggleAskCityVisible, setMarket} = MainSlice.actions


export const mainReducer = MainSlice.reducer