import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/user';
import navReducer from '../features/navigation';
import cartReducer from '../features/cart';
import notifReducer from '../features/notif';

export const store = configureStore({
    reducer: {userReducer, navReducer, cartReducer, notifReducer}
});