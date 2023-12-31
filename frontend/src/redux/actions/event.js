import axios from "axios";
import { server } from "../../server";

//create event
export const createEvent = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });

    const { d } = await axios.post(`${server}/event/create-event`, data);

    dispatch({
      type: "eventCreateSuccess",
      payload: d.event,
    });
  } catch (err) {
    dispatch({
      type: "eventCreateFail",
      payload: err.response?.data.message,
    });
  }
};

//Get all events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsShopRequest",
    });
    const { data } = await axios.get(
      `${server}/event/get-all-events-shop/${id}`
    );

    dispatch({
      type: "getAllEventsShopSuccess",
      payload: data.events,
    });
  } catch (err) {
    dispatch({
      type: "getAllEventsShopFail",
      payload: err.response?.data.message,
    });
  }
};

// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events`);
    dispatch({
      type: "getAllEventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsFail",
      payload: error.response?.data.message,
    });
  }
};

//Delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEventRequest",
    });

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteEventSuccess",
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: "deleteEventFail",
      payload: err.response?.data.message,
    });
  }
};
