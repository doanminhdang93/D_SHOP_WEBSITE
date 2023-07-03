import axios from "axios";
import { server } from "../../server";

//get all orders of an user
export const getAllOrdersOfUser = (userId) => async(dispatch) =>{
    try{
        dispatch({
            type: "getAllOrdersUserRequest",
        })
        const {data} = await axios.get(`${server}/order/get-all-orders/${userId}`);

        dispatch({
            type: "getAllOrdersUserSuccess",
            payload: data.orders
        })
    }catch(err){
        dispatch({
            type: "getAllOrdersUserFailed",
            payload: err.response.data.message
        })
    }
}
//get all orders of an shop
export const getAllOrdersOfShop = (shopId) => async(dispatch) =>{
    try{
        dispatch({
            type: "getAllOrdersShopRequest",
        })
        const {data} = await axios.get(`${server}/order/get-seller-all-orders/${shopId}`);

        dispatch({
            type: "getAllOrdersShopSuccess",
            payload: data.orders
        })
    }catch(err){
        dispatch({
            type: "getAllOrdersShopFailed",
            payload: err.response.data.message
        })
    }
}