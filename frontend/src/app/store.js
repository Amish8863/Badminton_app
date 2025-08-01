import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import matchReducer from '../features/matches/matchSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        match: matchReducer
    }
})

export default store;