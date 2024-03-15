import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications : []
}

export const notifSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.notifications = [...state.notifications , action.payload];
        },
        removeNotif: (state, action) => {
            state.notifications = state.notifications.filter(n=>n.time !== action.payload)
        }
    }
});

export const {addNotification, removeNotif} = notifSlice.actions;
export default notifSlice.reducer;