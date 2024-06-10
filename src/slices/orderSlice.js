import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";



export const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        allOrders: [],
        order:{
            customer:'',
            products:[]
        }
    },
    reducers: {
        addProduct: (state, action) => {
            console.log('action test',action.payload)
            state.order.products.push(action.payload);
        },
        addOrder: (state, action) => {
            state.allOrders.push(action.payload);
        },
        resetProducts: (state) => {
            state.order.products = [];
        },
    },
    extraReducers: (builder) => {
    }
})

export const {addProduct,addOrder,resetProducts} = orderSlice.actions;
export default orderSlice.reducer;