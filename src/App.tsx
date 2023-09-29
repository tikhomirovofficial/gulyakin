import React from 'react';
import AppRoutes from "./router/AppRoutes";
import Header from "./components/Header";
import {Logo} from "./icons";
import {Link} from "react-router-dom";
import Main from "./pages/Main";
import ShadowWrapper from "./components/Windows/ShadowWrapper";
import WindowBody from "./components/Windows/WhiteWrapper";
import LoginWindow from "./components/Windows/Login";
import BookingWindow from "./components/Windows/Booking";
import {useAppSelector} from "./app/hooks";
import Restaurants from "./pages/Restaurants";


function App() {
    const {bookingOpened, loginOpened} = useAppSelector(state => state.modals)

    return (
        <div className="App">
            {/*<AppRoutes isAuth={false}/>*/}
            <Restaurants/>
            {bookingOpened ? <BookingWindow/>: null}
            {loginOpened ? <LoginWindow/>: null}

        </div>
    );
}

export default App;
