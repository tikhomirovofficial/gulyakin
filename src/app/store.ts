import { configureStore } from '@reduxjs/toolkit'
import {profileReducer} from "../features/profile/profileSlice";
import {modalsReducer} from "../features/modals/modalsSlice";
import {mainReducer} from "../features/main/mainSlice";
import {restaurantsReducer} from "../features/restaurants/restaurantsSlice";
export const store = configureStore({
    reducer: {
        profile: profileReducer,
        modals: modalsReducer,
        main: mainReducer,
        restaurants: restaurantsReducer
        
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch