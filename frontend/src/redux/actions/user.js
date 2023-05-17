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