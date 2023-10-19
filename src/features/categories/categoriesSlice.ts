import {createSlice} from "@reduxjs/toolkit";
import {Category} from "../../types/api.types";


type CategoriesSliceState = {
    items: Category[]
}

const initialState: CategoriesSliceState = {
    items: [
        {
            id: 1,
            title: "Пельмени",
            image: "/media/products/image_2ee44e48-e078-4116-a60f-ec92d5f011f4.jpg",
        },
        {
            id: 2,
            title: "Супы",
            image: "/media/products/image_2ee44e48-e078-4116-a60f-ec92d5f011f4.jpg",
        }
    ]
}

export const CategoriesSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
    },
    extraReducers: {

    }
})

export const {

} = CategoriesSlice.actions


export const categoriesReducer = CategoriesSlice.reducer