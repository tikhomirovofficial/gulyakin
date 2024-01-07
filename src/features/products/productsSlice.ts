import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    Combo,
    GetCombosByMarketRequest,
    GetCombosByMarketResponse,
    GetProductsByMarketRequest,
    GetProductsByMarketResponse, GetSousesRequest, GetSousesResponse,
    N_GetProductByAddressRequest,
    N_GetProductByAddressResponse,
    ProductRes
} from "../../types/api.types";
import {AxiosResponse} from "axios";
import {ProductsApi} from "../../http/api/products.api";
import { N_ProductApi } from "../../types/products.types";


type ProductsSliceState = {
    productsLoading: boolean
    items: N_ProductApi[]
    combos: Combo[]
    souse: N_ProductApi[]
}

const initialState: ProductsSliceState = {
    productsLoading: false,
    items: [],
    combos: [],
    souse: []
}

export const getProductsByAddress = createAsyncThunk(
    'product/by-address',
    async (request: N_GetProductByAddressRequest, {dispatch}) => {
        const res: AxiosResponse<N_GetProductByAddressResponse> = await ProductsApi.ProductsByAddress(request)
        return res.data.products
    }
)
export const getCombosByMarket = createAsyncThunk(
    'combos/by-market',
    async (request: GetCombosByMarketRequest, {dispatch}) => {
        const res: AxiosResponse<GetCombosByMarketResponse> = await ProductsApi.CombosByMarket(request)
        return res.data.combos
    }
)
export const getSouses = createAsyncThunk(
    'souses/by-market',
    async (_, {dispatch}) => {
        const res: AxiosResponse<GetSousesResponse> = await ProductsApi.Souses()
        return res.data.souse
    }
)
export const ProductsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getProductsByAddress.fulfilled, (state, action) => {
            if (action.payload) {
                state.items = action.payload
            }
            state.productsLoading = false
        })
        builder.addCase(getProductsByAddress.pending, (state, action) => {
            state.productsLoading = true
        })
        builder.addCase(getProductsByAddress.rejected, (state, action) => {
            state.productsLoading = false
        })
        builder.addCase(getCombosByMarket.fulfilled, (state, action) => {
            if (action.payload) {
                state.combos = action.payload
            }
        })
        builder.addCase(getSouses.fulfilled, (state, action) => {
            if (action.payload) {
                state.souse = action.payload
            }
        })
    }
})

export const {} = ProductsSlice.actions


export const productsReducer = ProductsSlice.reducer