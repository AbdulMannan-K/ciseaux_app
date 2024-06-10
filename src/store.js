import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import clothsReducer from './slices/clothSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
    reducer:{
        auth:authReducer,
        cloths:clothsReducer,
        orders:orderReducer,
    },
})