import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from "./reducers/user";

const Store = configureStore({
    reducers: { 
        user: userReducer,
    }
}) 

export default Store;