import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {withFieldType} from "../../utils/withFieldType";
import {UserData} from "../../types/user.types";
import {CreateOrderRequest, CreateOrderResponse} from "../../types/api.types";
import {AxiosResponse} from "axios";
import {handleTokenRefreshedRequest} from "../../utils/auth/handleThunkAuth";
import {OrderApi} from "../../http/api/order.api";
import {validate} from "../../utils/forms/validator";
import {profileRules} from "../../validator/forms.rules";

export type FieldType = {
    val: string,
    isEditing: boolean
}
type ProfileFormType = {
    name: FieldType
    dob: FieldType
    email: FieldType
}

type OrderTime = "FAST" | string
type OrderPaymentWay = "CASH" | "CARD"

type OrderFormType = Pick<ProfileFormType, "name"> & {
    time: OrderTime
    callNeeded: boolean,
    paymentWay: OrderPaymentWay,
    address: FieldType,
    phone: string,
    isPickup: boolean,
    restaurant: number
}

type FormsSliceState = {
    profileErrors: Record<string, string>,
    profileErrsVisible: boolean,
    profileForm: ProfileFormType,
    orderForm: OrderFormType
}
export type Rule<FormType> = {
    key: keyof FormType,
    pattern?: RegExp,
    err?: string
}

export type FormChangeValByKey<FormType> = {
    keyField: keyof FormType
    val: string
}

const initialState: FormsSliceState = {
    profileErrors: {},
    profileErrsVisible: false,
    profileForm: {
        name: {
            isEditing: false, val: ""

        },
        dob: {
            isEditing: false, val: ""

        },
        email: {
            isEditing: false, val: ""
        }
    },
    orderForm: {
        name: {
            isEditing: false,
            val: ""
        },
        callNeeded: false,
        time: "FAST",
        paymentWay: "CARD",
        phone: "",
        address: {
            isEditing: false,
            val: ""
        },
        isPickup: true,
        restaurant: -1
    }
}

type PayloadHandleProfile = PayloadAction<FormChangeValByKey<ProfileFormType>>
type PayloadHandleProfileEditing = PayloadAction<keyof ProfileFormType>


type PayloadHandleOrder = PayloadAction<FormChangeValByKey<OrderFormType>>
type PayloadHandleOrderEditing = PayloadAction<keyof OrderFormType>

export const sendOrder = createAsyncThunk(
    'order/send',
    async (request: CreateOrderRequest, {dispatch}) => {
        const res: AxiosResponse<CreateOrderResponse> = await handleTokenRefreshedRequest(OrderApi.Create, request)
        return res

    }
)

export const formsSlice = createSlice({
    name: "forms",
    initialState,
    reducers: {
        handleProfileFormVal: (state, action: PayloadHandleProfile) => {
            const key = action.payload.keyField
            const newVal = action.payload.val

            const newProfileFormData = {
                ...state.profileForm,
                [key]: {
                    ...state.profileForm[key],
                    val: newVal
                }
            }

            state.profileForm = newProfileFormData

            state.profileErrors = validate<Omit<UserData, "phone">>({
                dob: newProfileFormData.dob.val,
                email: newProfileFormData.email.val,
                name: newProfileFormData.name.val
            }, profileRules)

            if(state.profileErrsVisible) {
                state.profileErrsVisible = false
            }
        },

        setProfileForm: (state, action: PayloadAction<UserData>) => {
            const userData = action.payload

            state.profileForm = {
                name: {
                    val: userData.name,
                    isEditing: false
                },
                email: {
                    val: userData.email,
                    isEditing: false
                },
                dob: {
                    val: userData.dob,
                    isEditing: false
                }

            }

        },
        resetProfileErrors: (state) => {
            state.profileErrors = {}
        },
        handleVisibleProfileErrors: (state, action: PayloadAction<boolean>) => {
            state.profileErrsVisible = action.payload
        },
        handleOrderFormVal: (state, action: PayloadHandleOrder) => {
            const key = action.payload.keyField
            const newVal = action.payload.val
            const field = state.orderForm[key]

            withFieldType(field, (fieldObject) => {
                state.orderForm = {
                    ...state.orderForm,

                    [key]: {
                        ...fieldObject,
                        val: newVal
                    }
                }
            })

        },
        handleOrderFormEditing: (state, action: PayloadHandleOrderEditing) => {
            const key = action.payload
            const field = state.orderForm[key]

            withFieldType(field, (fieldObject) => {
                state.orderForm = {
                    ...state.orderForm,
                    [key]: {
                        ...fieldObject,
                        isEditing: !fieldObject.isEditing
                    }
                }
            })

        },

        handleProfileFormEditing: (state, action: PayloadHandleProfileEditing) => {
            const key = action.payload
            state.profileForm = {
                ...state.profileForm,
                [key]: {
                    ...state.profileForm[key],
                    isEditing: !state.profileForm[key].isEditing
                }
            }
        },
        handleOrderTime: (state, action: PayloadAction<OrderTime>) => {

            state.orderForm = {
                ...state.orderForm,
                time: action.payload
            }
        },
        handleOrderPaymentWay: (state, action: PayloadAction<OrderPaymentWay>) => {

            state.orderForm = {
                ...state.orderForm,
                paymentWay: action.payload
            }
        },
        handleOrderCallNeeded: (state) => {

            state.orderForm = {
                ...state.orderForm,
                callNeeded: !state.orderForm.callNeeded
            }
        },
        handleOrderPickup: (state) => {

            state.orderForm = {
                ...state.orderForm,
                isPickup: !state.orderForm.isPickup
            }
        },
        setOrderForm: (state, action: PayloadAction<{ restaurant: number, address: string }>) => {
            state.orderForm = {
                ...state.orderForm,
                restaurant: action.payload.restaurant,
                address: {
                    ...state.orderForm.address,
                    val: action.payload.address
                }
            }
        },
        handleSelectRestaurant: (state, action: PayloadAction<number>) => {
            state.orderForm = {
                ...state.orderForm,
                restaurant: action.payload
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(sendOrder.pending, (state, action) => {

        })
        builder.addCase(sendOrder.fulfilled, (state, action) => {
            window.location.href = action.payload.data.payment_url
        })
        builder.addCase(sendOrder.rejected, (state, action) => {

        })
    }
})

export const {
    handleProfileFormVal,
    handleProfileFormEditing,
    handleOrderFormVal,
    handleOrderFormEditing,
    handleOrderCallNeeded,
    handleOrderTime,
    handleOrderPaymentWay,
    handleOrderPickup,
    handleSelectRestaurant,
    setOrderForm,
    resetProfileErrors,
    setProfileForm,
    handleVisibleProfileErrors
} = formsSlice.actions


export const formsReducer = formsSlice.reducer