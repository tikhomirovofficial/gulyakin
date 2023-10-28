import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    AddToCartRequest,
    AddToCartResponse,
    CartProductDeleteRequest,
    CartProductItem,
    ChangeCountCartRequest,
    ChangeCountCartResponse,
    GetCartResponse,
    ProductRes
} from "../../types/api.types";
import {AxiosResponse} from "axios";
import {handleTokenRefreshedRequest} from "../../utils/auth/handleThunkAuth";
import {CartApi} from "../../http/api/cart.api";


type CartSliceState = {
    items: Array<CartProductItem>,
    addProductAfterLogin: number | null,
    addProductAfterAddress: number | null,
    totalPrice: number,
    cartAdded: boolean,
    cartClassOpened: boolean
    cartAddedPopupInfo: {
        title: string
        weight: number
    }
    cartCounts: Record<string, number>
}

const initialState: CartSliceState = {
    items: [],
    addProductAfterLogin: null,
    addProductAfterAddress: null,
    totalPrice: 0,
    cartCounts: {},
    cartAdded: true,
    cartClassOpened: false,
    cartAddedPopupInfo: {title: "", weight: 0}

}

export const getCart = createAsyncThunk(
    'cart/get',
    async (_, {dispatch}) => {
        const res: AxiosResponse<GetCartResponse> = await handleTokenRefreshedRequest(CartApi.GetProducts)
        return {
            cart: res.data.cart,
            sup_counts: res.data.supplement_counts
        }
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
        return {
            product: request,
            data: res.data
        }
    }
)

export const editCountCart = createAsyncThunk(
    'cart/edit',
    async (request: Pick<ProductRes, "id"> & ChangeCountCartRequest, {dispatch}) => {
        const reqData: ChangeCountCartRequest = {
            cart_id: request.cart_id,
            count: request.count
        }
        const res: AxiosResponse<ChangeCountCartResponse> = await handleTokenRefreshedRequest(CartApi.EditProductCount, reqData)

        return {
            count: request.count,
            product_id: request.cart_id,
            data: res.data
        }
    }
)
export const removeFromCart = createAsyncThunk(
    'cart/remove',
    async (request: CartProductDeleteRequest, {dispatch}) => {
        const res: AxiosResponse<AddToCartResponse> = await handleTokenRefreshedRequest(CartApi.RemoveProduct, {
            cart_id: request.cart_id
        })
        return {
            res: res,
            cart_id: request.cart_id
        }
    }
)

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        cartAddedOpen: state => {
            state.cartAdded = true
            state.cartClassOpened = true

        },
        setCartAddedPopupInfo: (state, action: PayloadAction<{
            title: string,
            weight: number
        }>) => {
            state.cartAddedPopupInfo = {
                title: action.payload.title,
                weight: action.payload.weight
            }
        },
        resetCartAddedPopupInfo: state => {
            state.cartAddedPopupInfo = {
                title: "",
                weight: 0
            }
        },
        cartAddedClose: state => {
            state.cartClassOpened = false
            setTimeout(() => {
                state.cartAdded = false
            }, 300)
        },
        setProductAfterLogin: (state, action) => {
            state.addProductAfterLogin = action.payload
        },
        setProductAfterAddress: (state, action) => {
            state.addProductAfterAddress = action.payload
        },
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
                state.items = action.payload.cart
                state.totalPrice = action.payload.cart.reduce((prev, cur) => {
                    return prev + (cur.count * cur.product.price)
                }, 0)
                state.cartCounts = action.payload.sup_counts
            }

        })
        builder.addCase(getCart.rejected, (state, action) => {

        })
        //ADD TO CART
        builder.addCase(addToCart.pending, (state, action) => {

        })
        builder.addCase(addToCart.fulfilled, (state, action) => {
            const product = action.payload.product
            const res = action.payload.data
            if (action.payload) {

                const newState = [
                    ...state.items,
                    {
                        id: res.list_id[0],
                        product: {
                            composition: product.composition,
                            id: product.id,
                            title: product.title,
                            image: product.image,
                            price: product.price,
                            short_description: product.short_description,
                        },
                        supplements: product.supplements,
                        count: 1
                    }
                ]
                state.items = newState


            }
        })
        builder.addCase(addToCart.rejected, (state, action) => {

        })
        builder.addCase(editCountCart.pending, (state, action) => {

        })
        builder.addCase(editCountCart.fulfilled, (state, action) => {
            const cartProductId = action.payload.product_id
            if (action.payload) {
                const newState = state.items.map(item => {
                    if (item.id === cartProductId) {
                        item.count = action.payload.count
                        return item
                    }
                    return item
                })
                state.items = newState

            }

        })
        builder.addCase(editCountCart.rejected, (state, action) => {

        })
        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.cart_id)

        })
        builder.addCase(removeFromCart.rejected, (state, action) => {

        })
        builder.addCase(removeFromCart.pending, (state, action) => {

        })
    }
})

export const {
    addProduct,
    plusProduct,
    minusProduct,
    setTotalPrice,
    removeProduct,
    setProductAfterLogin,
    setProductAfterAddress,
    cartAddedClose,
    setCartAddedPopupInfo,
    resetCartAddedPopupInfo,
    cartAddedOpen
} = CartSlice.actions


export const cartReducer = CartSlice.reducer