import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addToStorage, getFromStorage} from "../../utils/LocalStorageExplorer";
import {
    GetProductsByMarketRequest,
    GetProductsByMarketResponse,
    GetUserDataResponse,
    ProductRes
} from "../../types/api.types";
import {AxiosResponse} from "axios";
import {handleTokenRefreshedRequest} from "../../utils/auth/handleThunkAuth";
import {UserApi} from "../../http/api/user.api";
import {setProfileForm} from "../forms/formsSlice";
import {ProductsApi} from "../../http/api/products.api";
import {getUser} from "../profile/profileSlice";


type ProductsSliceState = {
    items: ProductRes[]
}

const initialState: ProductsSliceState = {
    items: []
}
export const getProductByMarket = createAsyncThunk(
    'product/by-market',
    async (request: GetProductsByMarketRequest, {dispatch}) => {
        const res: AxiosResponse<GetProductsByMarketResponse> = await handleTokenRefreshedRequest(ProductsApi.ProductsByMarket, request)
        return res.data.products
    }
)
export const ProductsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {

    },
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
    }
})

export const {

} = ProductsSlice.actions


export const productsReducer = ProductsSlice.reducer