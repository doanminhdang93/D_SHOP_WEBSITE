import {createReducer} from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
}

export const productReducer = createReducer(initialState, {
    productCreateRequest: (state) =>{
        state.isLoading = true;
    },
    productCreateSuccess: (state,action) =>{
        state.isLoading = false;
        state.product = action.payload;
        state.success = true;
    },
    productCreateFail: (state,action) =>{
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },

    //Get all products of the shop
    getAllProductsShopRequest: (state) =>{
        state.isLoading = true;
    },
    getAllProductsSuccess: (state,action) =>{
        state.isLoading = false;
        state.products = action.payload;
        state.success = true;
    },
    getAllProductsFail: (state,action) =>{
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },

    //delete product of a shop
    deleteProductRequest: (state) =>{
        state.isLoading = true;
    },
    deleteProductSuccess: (state,action) =>{
        state.isLoading = false;
        state.message = action.payload;
    },
    deleteProductFail: (state,action) =>{
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },

    clearErrors: (state) =>{
        state.error = null;
    }
});