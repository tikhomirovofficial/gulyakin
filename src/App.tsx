import React, {useEffect} from 'react';
import LoginWindow from "./components/Windows/Login";
import BookingWindow from "./components/Windows/Booking";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import YourAddressWindow from "./components/Windows/YourAdress";
import ProductAdditives from "./components/Windows/ProductAdditives";
import CookiePopup from "./components/CookiePopup";
import DeliveryWay from "./components/Windows/DeliveryWay";
import NewAddress from "./components/Windows/NewAddress";
import AppRoutes from "./router/AppRoutes";
import Cart from "./components/Cart";
import {getCart, setTotalPrice} from "./features/cart/cartSlice";
import {ScrollToTop} from "./components/ServiceComponents";
import {getAddressesUser} from "./features/profile/profileSlice";
import useToken from "./hooks/useToken";
import Header from "./components/Header";
import LogosSection from "./components/LogosSection";
import Footer from "./components/Footer";
import {getCombosByMarket, getProductByMarket} from "./features/products/productsSlice";
import {getCategoriesByMarket} from "./features/categories/categoriesSlice";
import {addToStorage, getFromStorage} from "./utils/LocalStorageExplorer";
import {getAddressesByMarketCity, getCities, setIsMobile, setIsPhone} from "./features/main/mainSlice";
import {setOrderForm} from "./features/forms/formsSlice";
import HeaderMobile from "./components/Header/mobile";
import MenuMobile from "./components/MenuMobile";
import CartWidget from "./components/Cart/widget";
import {isDateValid} from "./utils/forms/dataValidation";

const MOBILE_WIDTH = 1100
const SMALL_WIDTH = 800

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
        newAddress,
        bodyLocked
    } = useAppSelector(state => state.modals)

    const {items} = useAppSelector(state => state.cart)
    const products = useAppSelector(state => state.products.items)
    const orderForm = useAppSelector(state => state.forms.orderForm)
    const {market, cities, currentGeo, isMobile, markets} = useAppSelector(state => state.main)

    const handleResize = () => {
        dispatch(setIsMobile(window.innerWidth <= MOBILE_WIDTH))
        dispatch(setIsPhone(window.innerWidth <= SMALL_WIDTH))
    }


    useEffect(() => {
        window.addEventListener('resize', () => {
            setTimeout(handleResize, 800)
        })
        handleResize()
    }, [])

    useEffect(() => {
        if (orderForm?.restaurant != -1 || orderForm?.addressId != -1) {
            addToStorage("order_form", {
                restaurant: orderForm.restaurant,
                address: orderForm.address.val,
                addressId: orderForm.addressId

            })
        }
    }, [orderForm])

    useEffect(() => {
        dispatch(setTotalPrice(
            items.reduce((prev, cur) => {
                const curProduct = cur.product
                const cartProductDefined = curProduct !== undefined
                const cartProductHasSupplements = cur.supplements !== undefined
                if(cartProductDefined) {
                    if(cartProductHasSupplements) {
                        return prev + (cur.count * curProduct.price) + (cur.supplements.reduce((p, c) => {
                            return p + c.price
                        }, 0))
                    }
                    return prev + (cur.count * curProduct.price)

                }
                return prev

            }, 0)
        ))

    }, [items])


    useEffect(() => {

        dispatch(getCategoriesByMarket({market_id: market}))
        dispatch(getProductByMarket({market_id: market}))
        dispatch(getCombosByMarket({market_id: market}))

        if (!cities.length) {
            dispatch(getCities())
        }
        const gettedOrderForm = getFromStorage("order_form")
        if (gettedOrderForm !== undefined && gettedOrderForm !== null) {
            const restaurantId = gettedOrderForm?.restaurant
            const addressId = gettedOrderForm?.addressId
            if (restaurantId != -1 || addressId != -1 ) {
                dispatch(setOrderForm({
                    restaurant: gettedOrderForm.restaurant,
                    address: gettedOrderForm.address,
                    addressId: gettedOrderForm.addressId
                }))
            }
        }

    }, [market])

    useEffect(() => {
        if (token) {
            dispatch(getCart())
            dispatch(getAddressesUser())
        }
    }, [token])

    useEffect(() => {
        if (cities.length > 0) {
            dispatch(getAddressesByMarketCity({
                market_id: market,
                siti_id: currentGeo.city
            }))
        }
    }, [cities, currentGeo.city, market])

    return (
        <>
            <ScrollToTop/>
            <div className={`App f-column jc-between`}>
                {isMobile ? <HeaderMobile/> : <Header/>}
                <LogosSection/>
                <AppRoutes isAuth={false}/>
                <Footer/>
                {isMobile ? <CartWidget/> : null}
                {isMobile ? <MenuMobile/> : null}
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
