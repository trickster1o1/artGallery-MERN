import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action) => {
            state.cart = state.cart.append(action.payload);
        },
        deleteCart: (state, action)=> {
            state.cart = state.cart.filter((c) => c.prodcut_id !== action.payload.product_id);
        },
        clearCart: (state,action) => {
            state.cart = [];
        }
    }
})

export const {addCart, deleteCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;