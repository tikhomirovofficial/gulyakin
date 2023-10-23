import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProductAdditiveData} from "../../types/products.types";
import {getImgPath} from "../../utils/getAssetsPath";
import {addToStorage, getFromStorage} from "../../utils/LocalStorageExplorer";
import {withFieldType} from "../../utils/withFieldType";
import {UserData} from "../../types/user.types";

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
type OrderPaymentWay =  "CASH" | "CARD"

type OrderFormType = Pick<ProfileFormType, "name"> &{
    time: OrderTime
    callNeeded: boolean,
    paymentWay: OrderPaymentWay,
    address: FieldType,
    phone: string,
    isPickup: boolean,
    restaurant: number
}

type FormsSliceState = {
    profileForm: ProfileFormType,
    orderForm: OrderFormType
}
export type FormChangeValByKey<FormType> = {
    keyField: keyof FormType
    val: string
}

const initialState: FormsSliceState = {
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
    orderForm: getFromStorage("order_form") as OrderFormType || {
        name: {
            isEditing:false,
            val: ""
        },
        callNeeded: false,

        time: "FAST",
        paymentWay: "CARD",
        phone: "+7(900) 500-18-49",
        address: {
            isEditing: false,
            val: ""
        },
        isPickup: true,
        restaurant: 0
    }
}

type PayloadHandleProfile =  PayloadAction<FormChangeValByKey<ProfileFormType>>
type PayloadHandleProfileEditing =  PayloadAction<keyof ProfileFormType>


type PayloadHandleOrder =  PayloadAction<FormChangeValByKey<OrderFormType>>
type PayloadHandleOrderEditing =  PayloadAction<keyof OrderFormType>

export const formsSlice = createSlice({
    name: "forms",
    initialState,
    reducers: {
        handleProfileFormVal: (state, action: PayloadHandleProfile) => {

            const key = action.payload.keyField
            const newVal = action.payload.val

            state.profileForm = {
                ...state.profileForm,
                [key]: {
                    ...state.profileForm[key],
                    val: newVal
                }
            }
        },
        setProfileForm: (state, action: PayloadAction<UserData>) => {
            const {name, dob, email} = action.payload

            state.profileForm = {
                name:  {
                    val: name,
                    isEditing: false
                },
                email: {
                    val: email,
                    isEditing: false
                },
                dob: {
                    val: dob,
                    isEditing: false
                }

            }
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
        handleSelectRestaurant: (state, action: PayloadAction<number>) => {
            state.orderForm = {
                ...state.orderForm,
                restaurant: action.payload
            }
        }
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
    setProfileForm,
} = formsSlice.actions


export const formsReducer = formsSlice.reducer