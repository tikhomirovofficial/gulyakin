import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Address, UserData} from "../../types/user.types";
import {UserApi} from "../../http/api/user.api";
import {getTokens} from "../../utils/storeTokens";
import {decodeToken} from "react-jwt";
import {setProfileForm} from "../forms/formsSlice";
import {handleTokenRefreshedRequest} from "../../utils/auth/handleThunkAuth";
import {GetUserDataResponse} from "../../types/api.types";


export interface ProfileState {
    data: UserData
    addresses: Array<Address & {id: number}>

}
export type AddressItemData = {
    id: number
} & Address
export const getUser = createAsyncThunk(
    'user/get',
    async (_, {dispatch}) => {
        // const refresh = getTokens()?.refresh
        //
        // const decoded = decodeToken(refresh || "") as { user_id?: string } || {};
        // const hasUserId = "user_id" in decoded;
        // const isRefreshValid = !!(refresh && hasUserId);
        //
        // if(isRefreshValid) {
        //     const res = await UserApi.User()
        //     console.log(res)
        //     dispatch(setProfileForm({
        //         ...res.user
        //     }))
        //
        //     return res.user
        // }
        // throw new Error("No refresh")
        const res: GetUserDataResponse = await handleTokenRefreshedRequest(UserApi.User)

        if(res.status) {
            dispatch(setProfileForm(res.user))

        }

        return res.user
    }
)
const initialState: ProfileState = {
    data: {
        name: "",
        dob: "",
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
    },
    extraReducers: builder => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            if(action.payload) {
                state.data = action.payload
            }
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.data = {
                name: "",
                dob: "",
                email: "",
                phone: ""
            }
        })
    }
})

export const {setProfile, addAddress, removeAddress} = ProfileSlice.actions


export const profileReducer = ProfileSlice.reducer