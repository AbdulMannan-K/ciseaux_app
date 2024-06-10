import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            name: 'Abdul Mannan',
            email: 'abdulmannankhan1000@gmail.com',
            phone: '1234567890',

            address: 'house 96, street 136, G-13/4',
            orders: [],
            measurements: {
                chest: 20,
                shoulders: 32,
                neck: 10,
                waist: 20,
                right_arm: 30,
                right_leg: 30,
                left_arm: 30,
                left_leg: 30,
            },
            height: 6,
        }
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        updateMeasurements: (state, action) => {
            state.user.measurements = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        updateUser : (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
    }
})

export const {login, logout,updateMeasurements,updateUser} = authSlice.actions;
export default authSlice.reducer;