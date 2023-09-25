import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/tikstyles.css';
import App from './App';
import {Provider} from 'react-redux';
import {store} from "./app/store";
import {BrowserRouter} from "react-router-dom";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter basename={"/"}>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>

);

