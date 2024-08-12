import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";

const store = configureStore({
    reducer: {
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export default store;