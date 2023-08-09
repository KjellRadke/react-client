import {configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";
import sessionReducer from './redux-session-slice.jsx';
const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, sessionReducer);
const reduxStore = configureStore({
    reducer: {
        session: persistedReducer,
    },
});

const persistedStore = persistStore(reduxStore);

export {reduxStore, persistedStore};