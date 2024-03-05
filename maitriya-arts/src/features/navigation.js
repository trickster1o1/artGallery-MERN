import { createSlice } from "@reduxjs/toolkit";
const initialState = '/navigation';

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        currentNav: (state,action) => {
            state = action.payload
        }
    }

});

export const {currentNav} = navSlice.actions;
export default navSlice.reducer;