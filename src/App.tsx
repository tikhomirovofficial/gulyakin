import React, {useEffect} from 'react';
import Main from "./pages/Main";
import LoginWindow from "./components/Windows/Login";
import BookingWindow from "./components/Windows/Booking";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import Restaurants from "./pages/Restaurants";
import YourAddressWindow from "./components/Windows/YourAdress";

import Profile from "./pages/Profile";
import ChosenRestaurant from "./pages/ChosenRestaurant";
import ProductAdditives from "./components/Windows/ProductAdditives";
import CookiePopup from "./components/CookiePopup";
import SuccessWindow from "./components/Windows/SuccessWindow";
import DeliveryWay from "./components/Windows/DeliveryWay";
import NewAddress from "./components/Windows/NewAddress";
import {YMaps} from "@pbe/react-yandex-maps";
import AppRoutes from "./router/AppRoutes";
import {getFromStorage} from "./utils/LocalStorageExplorer";
import Cart from "./components/Cart";
import {addProduct, plusProduct, setTotalPrice} from "./features/cart/cartSlice";
import {formatNumberWithSpaces} from "./utils/numberWithSpaces";
import {getImgPath} from "./utils/getAssetsPath";
import {ScrollToTop} from "./components/ServiceComponents";

const tempPages = [
    Main,
    Restaurants
]

function App() {

    const {bookingOpened, loginOpened, yourAddress, cartOpened, cookiesAccepted, deliveryWay, productAdditives, newAddress} = useAppSelector(state => state.modals)
    const {tempPage} = useAppSelector(state => state.main)
    const {items, totalPrice} = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()

    const CurrentPage = tempPages[tempPage]

    useEffect(() => {
        const totalProductPrice = items.reduce((prev, cur) => {
            return prev + cur.price * cur.count
        }, 0)
        dispatch(setTotalPrice(totalProductPrice))
    }, [items])



    return (
        <YMaps>
            <ScrollToTop/>
            <div className="App">
                <AppRoutes isAuth={false}/>
                {/*<CurrentPage/>*/}
                {bookingOpened ? <BookingWindow/> : null}
                {loginOpened ? <LoginWindow/> : null}
                {yourAddress ? <YourAddressWindow/> : null}
                {deliveryWay.opened ? <DeliveryWay/> : null}
                {productAdditives ? <ProductAdditives/> : null}
                {newAddress ? <NewAddress/> : null}
                {
                    cartOpened ? <Cart/> : null
                }
                <CookiePopup isOpened={cookiesAccepted}/>
            </div>
        </YMaps>



    );
}

export default App;
