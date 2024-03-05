import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/user';
import navReducer from '../features/navigation';

export const store = configureStore({
    reducer: {userReducer, navReducer}
});