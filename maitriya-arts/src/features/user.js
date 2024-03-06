import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state,action)=>{
            state.user = action.payload;
        }, logout: (state,action)=>{
            state.user = null;
        }
    }
})

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;