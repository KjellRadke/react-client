import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from "@material-tailwind/react";
import {Provider} from "react-redux";
import {persistedStore, reduxStore} from "./utility/redux/redux-store";
import {PersistGate} from "redux-persist/integration/react";
import {BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <Provider store={reduxStore}>
                    <PersistGate loading={null} persistor={persistedStore}>
                        <App/>
                    </PersistGate>
                </Provider>

            </ThemeProvider>
        </BrowserRouter>

    </React.StrictMode>
);

reportWebVitals();
