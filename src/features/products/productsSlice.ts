import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addToStorage, getFromStorage} from "../../utils/LocalStorageExplorer";
import {ProductRes} from "../../types/api.types";


type ProductsSliceState = {
    items: ProductRes[]
}

const initialState: ProductsSliceState = {
    items: [
        {
            id: 1,
            title: "Продукт 1",
            short_description: "Продукт 1",
            description: "Продукт 1",
            price: 10.0,
            image: "/media/products/image_2ee44e48-e078-4116-a60f-ec92d5f011f4.jpg",
            category: 1,
            weight: 0,
            supplements: [
                {
                    id: 1,
                    title: "Добавка 1",
                    short_description: "Добавка 1",
                    image: "supplements/image_ad04967c-045a-4c5d-a529-754fcdb49a64.jpg",
                    price: 1.0
                },
                {
                    id: 2,
                    title: "Добавка 2",
                    short_description: "Добавка 2 описание",
                    image: "supplements/image_bb2ea7bc-6b70-499a-ae78-fcfec1dc3680.jpg",
                    price: 10.0
                }
            ],
            composition: "Описание 1"
        }
    ]
}

export const ProductsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
    },
    extraReducers: {

    }
})

export const {

} = ProductsSlice.actions


export const productsReducer = ProductsSlice.reducer