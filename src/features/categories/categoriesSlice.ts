import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    Category,
    GetCategoriesByMarketRequest, GetCategoriesByMarketResponse,
    GetProductsByMarketRequest,
    GetProductsByMarketResponse
} from "../../types/api.types";
import {AxiosResponse} from "axios/index";
import {handleTokenRefreshedRequest} from "../../utils/auth/handleThunkAuth";
import {ProductsApi} from "../../http/api/products.api";
import {getProductByMarket} from "../products/productsSlice";


type CategoriesSliceState = {
    category: Category[]
}

const initialState: CategoriesSliceState = {
    category: []
}
export const getCategoriesByMarket = createAsyncThunk(
    'categories/by-market',
    async (request: GetCategoriesByMarketRequest, {dispatch}) => {
        const res: AxiosResponse<GetCategoriesByMarketResponse> = await handleTokenRefreshedRequest(ProductsApi.CategoriesByMarket, request)
        return res.data.category
    }
)

export const CategoriesSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
    },

    extraReducers: builder => {
        builder.addCase(getCategoriesByMarket.pending, (state, action) => {

        })
        builder.addCase(getCategoriesByMarket.fulfilled, (state, action) => {
            if (action.payload) {
                state.category = action.payload
            }
        })
        builder.addCase(getCategoriesByMarket.rejected, (state, action) => {

        })
    }

})

export const {

} = CategoriesSlice.actions


export const categoriesReducer = CategoriesSlice.reducer