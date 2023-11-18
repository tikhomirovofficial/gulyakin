import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addToStorage, getFromStorage} from "../../utils/common/LocalStorageExplorer";
import {AxiosResponse} from "axios";
import {
    AddressByCityItem,
    AddressByMarketCity,
    CanOrderAddressesByCityRequest,
    CanOrderAddressesByCityResponse,
    CanOrderByCityRequest,
    CanOrderByCityResponse,
    GetAddressesByMarketCityRequest,
    GetAddressesByMarketCityResponse,
    GetBookingsRequest,
    GetBookingsResponse,
    GetByCityAddressesRequest,
    GetByCityAddressesResponse,
    GetCitiesResponse,
    GetDeliveryListResponse,
    GetMarketsByCityRequest,
    GetMarketsByCityResponse,
    GetOrderDeliveryRequest,
    GetOrderDeliveryResponse,
    GetPaymentListResponse,
    MarketByCityItem,
    OrderDeliveryDetails
} from "../../types/api.types";
import {AddressesApi} from "../../http/api/addresses.api";
import {OrderApi} from "../../http/api/order.api";
import {MarketApi} from "../../http/api/market.api";

type Market = {
    title: string,
    id: number
    link_id: number
}
type VariantType = {
    title: string,
    id: number
}

type AddressType = {
    id: number,
    adress: string
}
export type OrderWarning = {
    title: string
    description: string
}
export type WorkTimes = {
    startTime: string
    endTime: string
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
    canOrder: boolean
    workTimes: WorkTimes
    orderWarning: OrderWarning
    markets: Array<Market>
    payments: VariantType[],
    deliveryTypes: VariantType[],
    bookingAddresses: AddressType[],
    cityMarkets: MarketByCityItem[],
    orderDetails: OrderDeliveryDetails
    cityAddresses: AddressByCityItem[],
    pickupAddresses: AddressByCityItem[],
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
    cityMarkets: [],
    cityAddresses: [],
    pickupAddresses: [],
    workTimes: {
        startTime: "6:00",
        endTime: "23:00"
    },
    canOrder: true,
    orderWarning: {
        description: "",
        title: ""
    },
    orderDetails: {
        delivery_type: 0, price: 0
    },
    markets: [
        {
            id: 2,
            link_id: 2,
            title: "Гуленьки Пельменная"
        },
        {
            id: 3,
            link_id: 3,
            title: "Гуленьки Блинная"
        },
        {
            id: 4,
            link_id: 4,
            title: "IFOOD"
        },
        {
            id: 5,
            link_id: 1,
            title: "Фудхолл"
        },
        {
            id: 6,
            link_id: 5,
            title: "Воробушек"
        },
        {
            id: 7,
            link_id: 6,
            title: "GUSTO"
        },
        {
            id: 8,
            link_id: 7,
            title: "Креветочная"
        },
        {
            id: 9,
            link_id: 8,
            title: "Гулибули"
        }
    ]
}
export const getCities = createAsyncThunk(
    'cities/get',
    async (_, {dispatch}) => {
        const res: AxiosResponse<GetCitiesResponse> = await AddressesApi.Cities()
        if (res.data.siti.length) {
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

export const getCanOrderByCity = createAsyncThunk(
    'can/order/get',
    async (request: CanOrderByCityRequest, {dispatch}) => {
        const res: AxiosResponse<CanOrderByCityResponse> = await OrderApi.GetCanOrderByCity(request)
        return res.data
    }
)
export const getCanOrderAddressesByCity = createAsyncThunk(
    'can/pickup/addresses/get',
    async (request: CanOrderAddressesByCityRequest, {dispatch}) => {
        const res: AxiosResponse<CanOrderAddressesByCityResponse> = await OrderApi.GetCanOrderAddressesByCity(request)
        return res.data
    }
)
export const getMarketsByCity = createAsyncThunk(
    'markets/city/get',
    async (request: GetMarketsByCityRequest, {dispatch}) => {
        const res: AxiosResponse<GetMarketsByCityResponse> = await MarketApi.MarketsByCity(request)
        if (res?.data) {
            if (res.data.market.length) {
                dispatch(setMarket(res.data.market[0].id))
            }
        }
        return res.data.market
    }
)
export const getBookings = createAsyncThunk(
    'bookings/get',
    async (request: GetBookingsRequest, {dispatch}) => {
        const res: AxiosResponse<GetBookingsResponse> = await AddressesApi.Bookings(request)
        return res.data.booking
    }
)
export const getDeliveryType = createAsyncThunk(
    'delivery/type/get',
    async (request: GetOrderDeliveryRequest, {dispatch}) => {
        const res: AxiosResponse<GetOrderDeliveryResponse> = await OrderApi.GetTypeDelivery(request)
        return res.data
    }
)
export const getAddressesByCity = createAsyncThunk(
    'addresses/city/get',
    async (request: GetByCityAddressesRequest, {dispatch}) => {
        const res: AxiosResponse<GetByCityAddressesResponse> = await AddressesApi.AddressesByCityId(request)
        return res.data.adress
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
            if (!getFromStorage("city_accepted")) {
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
        setOrderDetails: (state, action) => {
            state.orderDetails = action.payload
        },
        setOrderWarning: (state, action: PayloadAction<OrderWarning>) => {
            state.orderWarning = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getCities.fulfilled, (state, action) => {
            state.cities = action.payload.cities
            if (!state.currentGeo.city) {
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

        builder.addCase(getPayments.fulfilled, (state, action) => {
            state.payments = action.payload
        })
        builder.addCase(getMarketsByCity.fulfilled, (state, action) => {
            state.cityMarkets = action.payload
        })
        builder.addCase(getCanOrderByCity.fulfilled, (state, action) => {
            state.canOrder = action.payload.status
        })
        builder.addCase(getAddressesByCity.fulfilled, (state, action) => {
            state.cityAddresses = action.payload
        })
        builder.addCase(getCanOrderAddressesByCity.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.canOrder = action.payload.status
                state.pickupAddresses = action.payload.adress
                return;
            }
            state.canOrder = action.payload.status
        })
        builder.addCase(getDeliveryType.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.canOrder = action.payload.status
                state.orderDetails = {
                    delivery_type: action.payload.delivery_type,
                    price: action.payload.price
                }
                return
            }
            state.orderDetails = {
                delivery_type: 0,
                price: 0
            }
        })
    }
})

export const {
    setCurrentCity,
    setOrderWarning,
    setIsMobile,
    setOrderDetails,
    setIsPhone,
    toggleChangingGeo,
    toggleAskCityVisible,
    setMarket
} = MainSlice.actions


export const mainReducer = MainSlice.reducer