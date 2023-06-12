import axios from 'axios';
import {server} from '../../server';

//create product
export const createProduct = (newForm) => async (dispatch) =>{
    try{
        dispatch({
            type: "productCreateRequest",
        });

        const config = {headers: {"Content-Type":"multipart/form-data"}};

        const {data} = await axios.post(`${server}/product/create-product`,newForm,config);

        dispatch({
            type: "productCreateSuccess",
            payload: data.product,
        });
        
    }catch(err){
        dispatch({
            type: "productCreateFail",
            payload: err.response.data.message,
        }); 
    }
}

//Get all products
export const getAllProductsShop = (id) => async(dispatch) => {
    try{
        dispatch({
            type: "getAllProductsShopRequest",
        })
        const {data} = await axios.get(`${server}/product/get-all-products-shop/${id}`);

        dispatch({
            type: "getAllProductsSuccess",
            payload: data.products,
        })
    }catch(err){ 
        dispatch({
            type: "getAllProductsFail",
            payload: err.response.data.message,
        })
    }
}

//Delete product of a shop
export const deleteProduct = (id) => async(dispatch) =>{
    try{
        dispatch({
            type: "deleteProductRequest",
        });
        
        const {data} = await axios.delete(`${server}/product/delete-shop-product/${id}`,{withCredentials:true});

        dispatch({
            type: "deleteProductSuccess",
            payload: data.message,
        })
    }catch(err){ 
        dispatch({
            type: "deleteProductFail",
            payload: err.response.data.message,
        })
    }
}