import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Address, UserData} from "../../types/user.types";


export interface ProfileState {
    data: UserData
    addresses: Array<Address & {id: number}>
    isAuth: boolean

}
export type AddressItemData = {
    id: number
} & Address

const initialState: ProfileState = {
    data: {
        name: "Artem",
        birthday: "",
        email: "",
        phone: ""
    },
    addresses: [
        {
            id: 1,
            city: "г. Сургут",
            entrance: 3,
            flat: 47,
            floor: 4

        },
        {
            id: 2,
            city: "г. Сургут",
            code_door: 309,
            entrance: 2,
            flat: 59,
            floor: 6
        },

    ],
    isAuth: false
}

export const ProfileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<UserData>) => {
            state.data = action.payload
        },
        addAddress: (state, action: PayloadAction<AddressItemData>) => {
            state.addresses = [...state.addresses, action.payload]
        },
        removeAddress: (state, action: PayloadAction<number>) => {
            state.addresses = state.addresses.filter(item => item.id !== action.payload)
        }
    }
})

export const {setProfile, addAddress, removeAddress} = ProfileSlice.actions


export const profileReducer = ProfileSlice.reducer