import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {userSlice} from "./slices/userSlice";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
    user: userReducer
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
}
