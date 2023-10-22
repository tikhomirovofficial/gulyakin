import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartProduct} from "../../types/cart.types";
import {AddToCartRequest, AddToCartResponse, CartProductItem, GetCartResponse, ProductRes} from "../../types/api.types";
import {AxiosResponse} from "axios";
import {handleTokenRefreshedRequest} from "../../utils/auth/handleThunkAuth";
import {CartApi} from "../../http/api/cart.api";


type CartSliceState = {
    items: Array<CartProductItem>,
    totalPrice: number
}

const initialState: CartSliceState = {
    items: [],
    totalPrice: 0,
}

export const getCart = createAsyncThunk(
    'cart/get',
    async (_, {dispatch}) => {
        const res: AxiosResponse<GetCartResponse> = await handleTokenRefreshedRequest(CartApi.GetProducts)
        return res.data.cart
    }
)
export const addToCart = createAsyncThunk(
    'cart/add',
    async (request: ProductRes, {dispatch}) => {
        const productCartReq: AddToCartRequest = {
            products: [
                {
                    product: request.id,
                    supplements: request.supplements.map((item) => {
                        return {
                            count: 1,
                            id: item.id,
                        }
                    }),
                    count: 1
                }
            ]
        }
        const res: AxiosResponse<AddToCartResponse> = await handleTokenRefreshedRequest(CartApi.AddProduct, productCartReq)
        if(res.status) {
            // dispatch(addToCart({
            //     category: request.category,
            //     composition: request.composition,
            //     description: request.description,
            //     id: request.id,
            //     image: request.image,
            //     price: request.price,
            //     short_description: request.short_description,
            //     supplements: request.supplements,
            //     title: request.title,
            //     weight: request.weight
            // }))
        }
        return res.data
    }
)

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<CartProductItem>) => {
            state.items = [
                ...state.items,
                action.payload
            ]
        },
        plusProduct: (state, action: PayloadAction<number>) => {
            state.items = state.items.map(item => {
                if (item.product.id == action.payload) {

                    return {
                        ...item,
                        count: item.count + 1
                    }
                }
                return item
            })

        },
        minusProduct: (state, action: PayloadAction<number>) => {
            const productToMinus = state.items.find(item => item.id === action.payload);

            if (productToMinus) {
                if (productToMinus.count > 1) {
                    state.items = state.items.map(item => {
                        if (item.id == action.payload) {
                            return {
                                ...item,
                                count: item.count - 1
                            }
                        }
                        return item
                    })
                }
            }

        },
        removeProduct: (state, action: PayloadAction<number>) => {
            const productToRemove = state.items.find(item => item.product.id === action.payload);

            if (productToRemove) {
                const totalThisPrice = productToRemove.count * productToRemove.product.price;
                state.totalPrice -= totalThisPrice;
            }

            state.items = state.items.filter(item => item.product.id !== action.payload);

        },
        setTotalPrice: (state, action: PayloadAction<number>) => {
            state.totalPrice = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getCart.pending, (state, action) => {

        })
        builder.addCase(getCart.fulfilled, (state, action) => {
            if (action.payload) {
                state.items = action.payload
            }
        })
        builder.addCase(getCart.rejected, (state, action) => {

        })
        //ADD TO CART
        builder.addCase(addToCart.pending, (state, action) => {

        })
        builder.addCase(addToCart.fulfilled, (state, action) => {
            console.log(action.payload)
        })
        builder.addCase(addToCart.rejected, (state, action) => {

        })
    }
})

export const {
    addProduct,
    plusProduct,
    minusProduct,
    setTotalPrice,
    removeProduct,
} = CartSlice.actions


export const cartReducer = CartSlice.reducer