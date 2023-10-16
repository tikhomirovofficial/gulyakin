import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartProduct} from "../../types/cart.types";


type CartSliceState = {
    items: Array<CartProduct>,
    totalPrice: number
}

const initialState: CartSliceState = {
    // items: [
    //     {
    //         id: 1,
    //         isNotCanBeAdded: false,
    //         canBeChanged: false,
    //         description: "",
    //         imageUrl: "",
    //         name: "",
    //         price: 0,
    //         count: 1
    //     },
    //     {
    //         id: 2,
    //         isNotCanBeAdded: false,
    //         canBeChanged: true,
    //         description: "",
    //         imageUrl: "",
    //         name: "",
    //         price: 0,
    //         count: 1
    //     },
    //     {
    //         id: 3,
    //         isNotCanBeAdded: false,
    //         canBeChanged: false,
    //         description: "",
    //         imageUrl: "",
    //         name: "",
    //         price: 0,
    //         count: 1
    //     },
    //
    // ],
    items: [],
    totalPrice: 0,
}

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<CartProduct>) => {
            state.items = [
                ...state.items,
                action.payload
            ]
        },
        plusProduct: (state, action: PayloadAction<number>) => {

           state.items = state.items.map(item => {
               if(item.id == action.payload) {

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

            if(productToMinus) {
                if(productToMinus.count > 1) {
                    state.items = state.items.map(item => {
                        if(item.id == action.payload) {
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
            const productToRemove = state.items.find(item => item.id === action.payload);

            if (productToRemove) {
                const totalThisPrice = productToRemove.count * productToRemove.price;
                state.totalPrice -= totalThisPrice;
            }

            state.items = state.items.filter(item => item.id !== action.payload);

        },
        setTotalPrice: (state, action: PayloadAction<number>) =>{
            state.totalPrice = action.payload
        }
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