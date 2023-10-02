import React, {useState} from 'react';
import Main from "./pages/Main";
import LoginWindow from "./components/Windows/Login";
import BookingWindow from "./components/Windows/Booking";
import {useAppSelector} from "./app/hooks";
import Restaurants from "./pages/Restaurants";

const tempPages = [
    Main,
    Restaurants
]

function App() {

    const {bookingOpened, loginOpened} = useAppSelector(state => state.modals)
    const {tempPage} = useAppSelector(state => state.main)
    const CurrentPage = tempPages[tempPage]


    return (
        <div className="App">
            {/*<AppRoutes isAuth={false}/>*/}
            <CurrentPage/>
            {bookingOpened ? <BookingWindow/> : null}
            {loginOpened ? <LoginWindow/> : null}

        </div>
    );
}

export default App;
