import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
};

export const sellerReducer = createReducer(initialState,{
    loadSellerRequest: (state) =>{
        state.isLoading = true;
    },
    loadSellerSuccess: (state,action) =>{
        state.isSeller = true;
        state.isLoading = false;
        state.seller = action.payload;
    },
    loadSellerFailure: (state,action) =>{
        state.isLoading = false;
        state.error = action.payload;
        state.isSeller = false;
    },
    clearErrors: (state) =>{
        state.error = null;
    }
})