import axios from "axios";
import { server } from "../../server";

//load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });

    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "loadUserSuccess",
      payload: data.user,
    });
  } catch (err) {
    dispatch({
      type: "loadUserFailure",
      payload: err.response.data.message,
    });
  }
};

//load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadSellerRequest",
    });

    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });
    dispatch({
      type: "loadSellerSuccess",
      payload: data.seller,
    });
  } catch (err) {
    dispatch({
      type: "loadSellerFailure",
      payload: err.response.data.message,
    });
  }
};

//user update information
export const updateUserInformation =
  (email, password, phoneNumber, name) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: {
          successMessage: "Thông tin đã được cập nhật thành công!",
          user: data.user,
        },
      });
    } catch (err) {
      dispatch({
        type: "updateUserInfoFail",
        payload: err.response.data.message,
      });
    }
  };

//update user address
export const updateUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });
      const { data } = axios.put(
        `${server}/user/update-user-addresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "updateUserAddressSuccess",
        payload: {
          successMessage: "Địa chỉ đã được thêm thành công!",
          user: data.user,
        },
      });
    } catch (err) {
      dispatch({
        type: "updateUserAddressFail",
        payload: err.response?.data.message,
      });
    }
  };

//delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });
    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: "Địa chỉ đã được xoá thành công!",
        user: data.user,
      },
    });
  } catch (err) {
    dispatch({
      type: "deleteUserAddressFail",
      payload: err.response.data.message,
    });
  }
};

// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });

    const { data } = await axios.get(`${server}/user/admin-all-users`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response.data.message,
    });
  }
};
