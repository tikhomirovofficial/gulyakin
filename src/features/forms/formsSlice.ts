import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProductAdditiveData} from "../../types/products.types";
import {getImgPath} from "../../utils/getAssetsPath";
import {addToStorage, getFromStorage} from "../../utils/LocalStorageExplorer";

type FieldType = {
    val: string,
    isEditing: boolean
}
type ProfileFormType = {
    name: FieldType
    dob: FieldType
    email: FieldType
}
type OrderFormType = Pick<ProfileFormType, "name"> &{
    time: "FAST" | string
    callNeeded: boolean,
    paymentWay: "CASH" | "CARD",
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
            isEditing: false, val: "Вячеслав"

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
            isEditing:false,
            val: ""
        },
        callNeeded: false,
        time: "FAST",
        paymentWay: "CARD"
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
        handleOrderFormVal: (state, action: PayloadHandleOrder) => {
            const key = action.payload.keyField
            const newVal = action.payload.val
            const isObject = typeof state.orderForm[key] == "object"

            if(isObject) {
                const asObject = state.orderForm[key] as object as FieldType
                const hasNecessaryFields = Object.hasOwn(asObject, "val") &&  Object.hasOwn(asObject, "isEditing")

                if(hasNecessaryFields) {
                    state.orderForm = {
                        ...state.orderForm,

                        [key]: {
                            ...asObject,
                            val: newVal
                        }
                    }
                }
            }


        },
        handleOrderFormEditing: (state, action: PayloadHandleOrderEditing) => {
            const key = action.payload
            const isObject = typeof state.orderForm[key] == "object"

            if(isObject) {
                const asObject = state.orderForm[key] as object as FieldType
                const hasNecessaryFields = Object.hasOwn(asObject, "val") &&  Object.hasOwn(asObject, "isEditing")

                if(hasNecessaryFields) {
                    state.orderForm = {
                        ...state.orderForm,
                        [key]: {
                            ...asObject,
                            isEditing: !asObject.isEditing
                        }
                    }
                }
            }


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
        }
    }
})

export const {
    handleProfileFormVal,
    handleProfileFormEditing,

    handleOrderFormVal,
    handleOrderFormEditing
} = formsSlice.actions


export const formsReducer = formsSlice.reducer