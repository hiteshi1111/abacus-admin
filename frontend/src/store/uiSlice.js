import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: false,
    setLogin: () => {},
    userData: null,
    setUserData: () => {}
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLogin(state, action){
            state.isCartOpen = action.payload;
        },
        setUserData(state, action){
            state.isMenuOpen = action.payload;
        },
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;