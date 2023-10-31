import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getImgPath} from "../../utils/getAssetsPath";

const initialState = {
    list: [
        {
            branches: [
                {
                    cityArea: "Центральный район",
                    canOnlineOrder: true,
                    street: "ул. Энергетиков, д. 5",
                    coords: [53.45, 30],
                    id: 1
                },
                {
                    cityArea: "Восточный район",
                    canOnlineOrder: true,
                    street: "ул. Энергетиков, д. 4",
                    coords: [53.45, 10],
                    id: 2
                },
                {
                    cityArea: "Восточный район",
                    canOnlineOrder: true,
                    street: "ул. Энергетиков, д. 4",
                    coords: [53.45, 10],
                    id: 2
                },
                {
                    cityArea: "Восточный район",
                    canOnlineOrder: true,
                    street: "ул. Энергетиков, д. 4",
                    coords: [53.45, 10],
                    id: 2
                },
                {
                    cityArea: "Восточный район",
                    canOnlineOrder: true,
                    street: "ул. Энергетиков, д. 4",
                    coords: [53.45, 10],
                    id: 2
                }
            ],
            logoIconSrc: getImgPath("/logos/logo_gulyakin.svg"),
            name: "Гулякин",
            id: 1
        },
        {
            branches: [
                {
                    cityArea: "",
                    canOnlineOrder: true,
                    street: "",
                    coords: [58.45, 20]
                },
                {
                    cityArea: "",
                    canOnlineOrder: true,
                    street: "",
                    coords: [43.45, 15]
                }
            ],
            logoIconSrc: "",
            name: "Гуленьки",
            id: 2

        }
    ],
    chosen: {
        id: 1,
        images: [
            getImgPath("Restaurant.jpg"),
            getImgPath("Restaurant.jpg"),
            getImgPath("Restaurant.jpg"),
            getImgPath("Restaurant.jpg"),
            getImgPath("Restaurant.jpg"),
            getImgPath("Restaurant.jpg"),
            getImgPath("Restaurant.jpg"),
            getImgPath("Restaurant.jpg"),
            getImgPath("Restaurant.jpg"),
        ],
        phone: "+7 (951) 735-89-45",
        cityArea: "Центральный район",
        canOnlineOrder: true,
        street: "ул. Энергетиков, д. 5",
        coords: [53.45, 30],
        logoIconSrc: getImgPath("/logos/logo_gulyakin.svg"),
    },
    selectedInPickup: -1,
    selectedInDelivery: -1,
}

export const RestaurantsSlice = createSlice({
    name: "restaurants",
    initialState,
    reducers: {
        setSelectedInPickup: (state, action: PayloadAction<number>) => {
            state.selectedInPickup = action.payload
        },
        setSelectedInDelivery: (state, action: PayloadAction<number>) => {
            state.selectedInDelivery = action.payload
        }
    }
})

export const {
    setSelectedInPickup,
    setSelectedInDelivery
} = RestaurantsSlice.actions


export const restaurantsReducer = RestaurantsSlice.reducer