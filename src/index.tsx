import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/tikstyles.css';
import App from './App';
import {Provider} from 'react-redux';
import {store} from "./app/store";
import {BrowserRouter, createHashRouter, RouterProvider} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createHashRouter([
    {
        path: "/*",
        element: <App />,
    }
]);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>

);

