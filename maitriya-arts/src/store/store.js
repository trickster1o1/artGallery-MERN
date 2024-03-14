import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/user';
import navReducer from '../features/navigation';
import cartReducer from '../features/cart';

export const store = configureStore({
    reducer: {userReducer, navReducer, cartReducer}
});