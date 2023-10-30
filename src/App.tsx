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
import {getCart, setTotalPrice} from "./features/cart/cartSlice";
import {ScrollToTop} from "./components/ServiceComponents";
import {getUser} from "./features/profile/profileSlice";
import useAuth from "./hooks/useAuth";
import useToken from "./hooks/useToken";
import Header from "./components/Header";
import LogosSection from "./components/LogosSection";
import Footer from "./components/Footer";
import product from "./components/Catalog/Product";
import {getCombosByMarket, getProductByMarket} from "./features/products/productsSlice";
import {getCategoriesByMarket} from "./features/categories/categoriesSlice";
import {addToStorage, getFromStorage} from "./utils/LocalStorageExplorer";
import order from "./pages/Order";
import {getAddressesByMarketCity, getCities, setIsMobile} from "./features/main/mainSlice";
import {setOrderForm} from "./features/forms/formsSlice";
import HeaderMobile from "./components/Header/mobile";
import MenuMobile from "./components/MenuMobile";

const MOBILE_WIDTH = 1100
function App() {
    const dispatch = useAppDispatch()
    const token = useToken()

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
    const products = useAppSelector(state => state.products.items)
    const orderForm = useAppSelector(state => state.forms.orderForm)
    const {market, cities, currentGeo, isMobile} = useAppSelector(state => state.main)

    const handleResize = () => {
        if (window.innerWidth <= MOBILE_WIDTH) {
            dispatch(setIsMobile(true))
            return;
        }
        dispatch(setIsMobile(false))

    }


    useEffect(() => {
        window.addEventListener('resize', () => {
            setTimeout(handleResize, 800)
        })
        handleResize()
    }, [])

    useEffect(() => {
        if(orderForm?.restaurant != -1 || orderForm?.address.val.length > 0) {
            addToStorage("order_form", {
                restaurant: orderForm.restaurant,
                address: orderForm.address.val
            })
        }
    }, [orderForm])

    useEffect(() => {
        dispatch(setTotalPrice(
            items.reduce((prev, cur) => {
                return prev + (cur.count * cur.product.price) + (cur.supplements.reduce((p, c) => {
                    return p + c.price
                }, 0))
            }, 0)
        ))

    }, [items])


    useEffect(() => {
        if(!products.length) {
            dispatch(getCategoriesByMarket({market_id: market}))
            dispatch(getProductByMarket({market_id: market}))
            dispatch(getCombosByMarket({market_id: market}))
        }
        if(!cities.length) {
            dispatch(getCities())
        }
        const gettedOrderForm = getFromStorage("order_form")
        if (gettedOrderForm !== undefined && gettedOrderForm !== null) {
            if(gettedOrderForm?.restaurant != -1 || gettedOrderForm?.address.length > 0) {
                dispatch(setOrderForm({
                    restaurant: gettedOrderForm.restaurant,
                    address: gettedOrderForm.address
                }))
            }
        }

    }, [])

    useEffect(() => {
        if(token) {
            dispatch(getCart())
        }
    }, [token])
    useEffect(() => {
        if(cities.length > 0) {
            dispatch(getAddressesByMarketCity({
                market_id: market,
                siti_id: currentGeo.city
            }))
        }
    }, [cities])

    return (
        <>
            <ScrollToTop/>
            <div className="App f-column jc-between">
                {isMobile ? <HeaderMobile/> : <Header/>}
                <LogosSection/>
                <AppRoutes isAuth={false}/>
                <Footer/>
                <MenuMobile/>
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
