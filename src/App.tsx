import React from 'react';
import AppRoutes from "./router/AppRoutes";
import Header from "./components/Header";
import {Logo} from "./icons";
import {Link} from "react-router-dom";


function App() {

    return (
        <div className="App">
            {/*<Header/>*/}
            <AppRoutes isAuth={false}/>

        </div>
    );
}

export default App;
