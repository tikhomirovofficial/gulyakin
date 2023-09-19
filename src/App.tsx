import React from 'react';
import AppRoutes from "./router/AppRoutes";
import Header from "./components/Header";


function App() {

    return (
        <div className="App">
            <Header/>
            <AppRoutes isAuth={false}/>
        </div>
    );
}

export default App;
