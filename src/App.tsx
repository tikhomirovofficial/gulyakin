import React from 'react';
import AppRoutes from "./router/AppRoutes";
import Header from "./components/Header";
import {Logo} from "./icons";
import {Link} from "react-router-dom";
import Main from "./pages/Main";
import ShadowWrapper from "./components/Windows/ShadowWrapper";
import WindowBody from "./components/Windows/WhiteWrapper";
import LoginWindow from "./components/Windows/Login";


function App() {

    return (
        <div className="App">
            {/*<AppRoutes isAuth={false}/>*/}
            <Main/>
            <LoginWindow/>
        </div>
    );
}

export default App;
