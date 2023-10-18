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
    time: number
    callNeeded: boolean,
    paymentWay: "CASH" | "CARD"
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
        time: Date.now(),
        paymentWay: "CARD"
    }
}

type PayloadHandleProfile =  PayloadAction<FormChangeValByKey<ProfileFormType>>
type PayloadHandleProfileEditing =  PayloadAction<keyof ProfileFormType>
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
    handleProfileFormEditing
} = formsSlice.actions


export const formsReducer = formsSlice.reducer