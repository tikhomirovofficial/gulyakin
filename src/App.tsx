import React, {useEffect} from 'react';
import LoginWindow from "./components/Windows/Login";
import BookingWindow from "./components/Windows/Booking";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import YourAddressWindow from "./components/Windows/YourAdress";
import ProductAdditives from "./components/Windows/ProductAdditives";
import CookiePopup from "./components/CookiePopup";
import DeliveryWay from "./components/Windows/DeliveryWay";
import NewAddress from "./components/Windows/NewAddress";
import {YMaps} from "@pbe/react-yandex-maps";
import AppRoutes from "./router/AppRoutes";
import Cart from "./components/Cart";
import {setTotalPrice} from "./features/cart/cartSlice";
import {ScrollToTop} from "./components/ServiceComponents";
import {getUser} from "./features/profile/profileSlice";
import useAuth from "./hooks/useAuth";
import useToken from "./hooks/useToken";
import Header from "./components/Header";
import LogosSection from "./components/LogosSection";
import Footer from "./components/Footer";

function App() {
    const dispatch = useAppDispatch()
    const is_auth = useAuth()

    const {
        bookingOpened,
        loginOpened,
        yourAddress,
        cartOpened,
        cookiesAccepted,
        deliveryWay,
        productAdditives,
        newAddress
    } = useAppSelector(state => state.modals)

    const {items} = useAppSelector(state => state.cart)
    const profileData = useAppSelector(state => state.profile.data)

    useEffect(() => {
        const totalProductPrice = items.reduce((prev, cur) => {
            return prev + cur.price * cur.count
        }, 0)
        dispatch(setTotalPrice(totalProductPrice))
    }, [items])


    useEffect(() => {
        if (is_auth) {
            console.log("Запрос корзина")
        }
    }, [is_auth])


    return (
        <>
            <ScrollToTop/>
            <div className="App f-column jc-between">
                <Header/>
                <LogosSection/>
                <AppRoutes isAuth={false}/>
                <Footer/>
                {bookingOpened ? <BookingWindow/> : null}
                {loginOpened ? <LoginWindow/> : null}
                {yourAddress ? <YourAddressWindow/> : null}
                {deliveryWay.opened ? <DeliveryWay/> : null}
                {productAdditives ? <ProductAdditives/> : null}
                {newAddress ? <NewAddress/> : null}
                {cartOpened ? <Cart/> : null}
                <CookiePopup isOpened={cookiesAccepted}/>
            </div>
        </>


    );
}

export default App;
