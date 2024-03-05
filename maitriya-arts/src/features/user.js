import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        val: localStorage.getItem('user') ? Number(localStorage.getItem('user')) : 1,
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state,action)=>{
            state.user = {
                val: state.user.val + action.payload
            };
        }, logout: (state,action)=>{
            state.user = {
                val: state.user.val === 1 ? state.user.val : state.user.val - action.payload 
            };
        }
    }
})

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;