import React from 'react';
import AppRoutes from "./router/AppRoutes";
import Header from "./components/Header";
import {Logo} from "./icons";
import {Link} from "react-router-dom";
import Main from "./pages/Main";


function App() {

    return (
        <div className="App">
            {/*<AppRoutes isAuth={false}/>*/}
            <Main/>
        </div>
    );
}

export default App;
