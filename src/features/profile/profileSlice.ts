import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Address, UserData} from "../../types/user.types";
import {UserApi} from "../../http/api/user.api";
import {setProfileForm} from "../forms/formsSlice";
import {handleTokenRefreshedRequest} from "../../utils/auth/handleThunkAuth";
import {
    AddressAddRequest, AddressAddResponse,
    ChangeUserRequest,
    ChangeUserResponse,
    DeleteUserAddressRequest, DeleteUserAddressResponse,
    GetUserDataResponse, UserAddressesResponse
} from "../../types/api.types";
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
export const getAddressesUser = createAsyncThunk(
    'user/address/get',
    async (_, {dispatch}) => {
        const res: AxiosResponse<UserAddressesResponse> = await handleTokenRefreshedRequest(UserApi.Addresses)
        return res.data.adress

    }
)
export const addAddressUser = createAsyncThunk(
    'user/address/add',
    async (request: AddressAddRequest, {dispatch}) => {
        const res: AxiosResponse<AddressAddResponse> = await handleTokenRefreshedRequest(UserApi.AddAddress, request)
        return {
            id: res.data.id,
            ...request
        }

    }
)
export const deleteAddressUser = createAsyncThunk(
    'user/address/delete',
    async (request: DeleteUserAddressRequest, {dispatch}) => {
        const res: AxiosResponse<DeleteUserAddressResponse> = await handleTokenRefreshedRequest(UserApi.DeleteAddress, request)
        return {
            address_id: request.adress_id,
        }


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
        builder.addCase(addAddressUser.fulfilled, (state, action) => {
            if(action.payload) {
                state.addresses = [...state.addresses, {
                    id: action.payload.id,
                    city: action.payload.adress,
                    flat: action.payload.apartment,
                    code_door: action.payload.apartment,
                    entrance: action.payload.entrance,
                    floor: action.payload.floor
                }]
            }
            state.isLoading = false

        })
        builder.addCase(addAddressUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(addAddressUser.rejected, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(getAddressesUser.fulfilled, (state, action) => {

            if(action.payload) {
                state.addresses = [...action.payload.map(item => {
                    return {
                        id: item.id,
                        city: item.adress,
                        flat: item.apartment,
                        floor: item.floor,
                        entrance: item.entrance,
                        code_door: item.door_code
                    }
                })]
                console.log(action.payload)
            }
        })
        builder.addCase(getAddressesUser.pending, (state, action) => {
        })
        builder.addCase(getAddressesUser.rejected, (state, action) => {

        })
        builder.addCase(deleteAddressUser.fulfilled, (state, action) => {
           state.addresses = state.addresses.filter(item => item.id !== action.payload.address_id)
        })
        builder.addCase(deleteAddressUser.pending, (state, action) => {
        })
        builder.addCase(deleteAddressUser.rejected, (state, action) => {

        })



    }
})

export const {setProfile, addAddress, removeAddress, setLoading} = ProfileSlice.actions


export const profileReducer = ProfileSlice.reducer