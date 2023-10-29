import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    Combo,
    GetCombosByMarketRequest,
    GetCombosByMarketResponse,
    GetProductsByMarketRequest,
    GetProductsByMarketResponse,
    ProductRes
} from "../../types/api.types";
import {AxiosResponse} from "axios";
import {ProductsApi} from "../../http/api/products.api";


type ProductsSliceState = {
    items: ProductRes[]
    combos: Combo[]
}

const initialState: ProductsSliceState = {
    items: [],
    combos: []
}
export const getProductByMarket = createAsyncThunk(
    'product/by-market',
    async (request: GetProductsByMarketRequest, {dispatch}) => {
        const res: AxiosResponse<GetProductsByMarketResponse> = await ProductsApi.ProductsByMarket(request)
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
export const ProductsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getProductByMarket.pending, (state, action) => {

        })
        builder.addCase(getProductByMarket.fulfilled, (state, action) => {
            if (action.payload) {
                state.items = action.payload
            }
        })
        builder.addCase(getProductByMarket.rejected, (state, action) => {

        })
        builder.addCase(getCombosByMarket.pending, (state, action) => {

        })
        builder.addCase(getCombosByMarket.fulfilled, (state, action) => {
            if (action.payload) {
                state.combos = action.payload
            }
        })
        builder.addCase(getCombosByMarket.rejected, (state, action) => {

        })
    }
})

export const {} = ProductsSlice.actions


export const productsReducer = ProductsSlice.reducer