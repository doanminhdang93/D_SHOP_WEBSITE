import axios from 'axios';
import {server} from '../../server';

//create event
export const createEvent = (newForm) => async (dispatch) =>{
    try{
        dispatch({
            type: "eventCreateRequest",
        });

        const config = {headers: {"Content-Type":"multipart/form-data"}};

        const {data} = await axios.post(`${server}/event/create-event`,newForm,config);

        dispatch({
            type: "eventCreateSuccess",
            payload: data.event,
        });
        
    }catch(err){
        dispatch({
            type: "eventCreateFail",
            payload: err.response.data.message,
        }); 
    }
}

//Get all events of a shop
export const getAllEventsShop = (id) => async(dispatch) => {
    try{
        dispatch({
            type: "getAllEventsShopRequest",
        })
        const {data} = await axios.get(`${server}/event/get-all-events-shop/${id}`);

        dispatch({
            type: "getAllEventsShopSuccess",
            payload: data.events,
        })
    }catch(err){ 
        dispatch({
            type: "getAllEventsShopFail",
            payload: err.response.data.message,
        })
    }
}

//Get all events 
export const getAllEvents = (id) => async(dispatch) => {
    try{
        dispatch({
            type: "getAllEventsRequest",
        })
        const {data} = await axios.get(`${server}/event/get-all-events`);

        dispatch({
            type: "getAllEventsSuccess",
            payload: data.events,
        })
    }catch(err){ 
        dispatch({
            type: "getAllEventsFail",
            payload: err.response.data.message,
        })
    }
}

//Delete event of a shop
export const deleteEvent = (id) => async(dispatch) =>{
    try{
        dispatch({
            type: "deleteEventRequest",
        });
        
        const {data} = await axios.delete(`${server}/event/delete-shop-event/${id}`,{withCredentials:true});

        dispatch({
            type: "deleteEventSuccess",
            payload: data.message,
        })
    }catch(err){ 
        dispatch({
            type: "deleteEventFail",
            payload: err.response.data.message,
        })
    }
}