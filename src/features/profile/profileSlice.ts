import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserData} from "../../types/user.types";


export interface ProfileState {
    data: UserData
    isAuth: boolean

}

const initialState: ProfileState = {
    data: {
        name: "Artem",
        age: 19
    },
    isAuth: false
}

export const ProfileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<UserData>) => {
            state.data = action.payload
        }
    }
})

export const {setProfile} = ProfileSlice.actions


export const profileReducer = ProfileSlice.reducer