import axios from 'axios';
import { server } from '../../server';

//load user  
export const loadUser = () => async(dispatch) => {
    try{
        dispatch({
            type: "LoadUserRequest",
        })
        
        const {data} = await axios.get(`${server}/user/getuser`,{withCredentials: true});
        dispatch({
            type: "LoadUserSuccess",
            payload: data.user,
        })
    }catch(err){
        dispatch({
            type: "LoadUserFailure",
            payload: err.response.data.message,
        })
    }
}

//load seller  
export const loadSeller = () => async(dispatch) => {
    try{
        dispatch({
            type: "LoadSellerRequest",
        })
        
        const {data} = await axios.get(`${server}/shop/getSeller`,{withCredentials: true});
        dispatch({
            type: "LoadSellerSuccess",
            payload: data.seller,
        })
    }catch(err){
        dispatch({
            type: "LoadSellerFailure",
            payload: err.response.data.message,
        })
    }
}