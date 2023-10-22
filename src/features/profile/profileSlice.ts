import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Address, UserData} from "../../types/user.types";
import {UserApi} from "../../http/api/user.api";
import {setProfileForm} from "../forms/formsSlice";
import {handleTokenRefreshedRequest} from "../../utils/auth/handleThunkAuth";
import {AddressAddRequest, ChangeUserRequest, ChangeUserResponse, GetUserDataResponse} from "../../types/api.types";
import {AxiosResponse} from "axios";


export interface ProfileState {
    isLoading: boolean,
    error: string
    data: UserData

    addresses: Array<Address & { id: number }>

}

export type AddressItemData = {
    id: number
} & Address

export const getUser = createAsyncThunk(
    'user/get',
    async (_, {dispatch}) => {
        const res: AxiosResponse<GetUserDataResponse> = await handleTokenRefreshedRequest(UserApi.User)
        if (res.status) {
            dispatch(setProfileForm(res.data.user))
        }
        return res.data.user
    }
)
export const editUser = createAsyncThunk(
    'user/edit',
    async (request: ChangeUserRequest, {dispatch}) => {
        const res: AxiosResponse<ChangeUserResponse> = await handleTokenRefreshedRequest(UserApi.Edit, request)
        if (res.status) {
            dispatch(setProfile(res.data.user))
            dispatch(setProfileForm(res.data.user))
        }
        return res
    }
)
export const addAddressUser = createAsyncThunk(
    'user/address/add',
    async (request: AddressAddRequest, {dispatch}) => {
        const res: GetUserDataResponse = await handleTokenRefreshedRequest(UserApi.AddAddress, request)
        if (res.status) {
            dispatch(addAddressUser(request))
        }
        return res
    }
)


const initialState: ProfileState = {
    isLoading: false,
    error: "",
    data: {
        name: "",
        dob: "",
        email: "",
        phone: ""
    },
    addresses: [
    ],
}

export const ProfileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
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
        //GET USER
        builder.addCase(getUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.data = action.payload
            }
            state.error = ""
            state.isLoading = false

        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.data = {
                name: "",
                dob: "",
                email: "",
                phone: ""
            }

            state.error = "Произошла ошибка сервера"
            state.isLoading = false

        })
        //CHANGE USER
        builder.addCase(editUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(editUser.fulfilled, (state, action) => {
            // if (action.payload) {
            //     state.data = action.payload.user
            // }
            state.error = ""
            state.isLoading = false

        })
        builder.addCase(editUser.rejected, (state, action) => {
            state.error = "Не удалось изменить данные."
            state.isLoading = false
        })

    }
})

export const {setProfile, addAddress, removeAddress, setLoading} = ProfileSlice.actions


export const profileReducer = ProfileSlice.reducer