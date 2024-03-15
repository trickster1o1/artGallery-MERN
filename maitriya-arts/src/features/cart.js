import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action) => {
            state.cart = action.payload;
        },
        deleteCart: (state, action)=> {
            state.cart = state.cart.filter((c) => c.product_id !== action.payload);
        },
        clearCart: (state,action) => {
            state.cart = [];
        }
    }
})

export const {addCart, deleteCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;