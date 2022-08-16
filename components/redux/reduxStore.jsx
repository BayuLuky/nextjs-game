import { configureStore } from "@reduxjs/toolkit";
import ReduxReducers from "./reduxReducers";

//mode development
let store = configureStore({reducer: ReduxReducers, devTools: true})

export default store