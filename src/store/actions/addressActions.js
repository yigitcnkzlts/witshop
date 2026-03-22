import api from "../../api/api";

// Action Creators
export const setAddressList = (addresses) => ({
  type: "SET_ADDRESS_LIST",
  payload: addresses
});

export const addAddress = (address) => ({
  type: "ADD_ADDRESS",
  payload: address
});

export const updateAddress = (address) => ({
  type: "UPDATE_ADDRESS",
  payload: address
});

export const removeAddress = (addressId) => ({
  type: "REMOVE_ADDRESS",
  payload: addressId
});

export const setSelectedAddress = (address) => ({
  type: "SET_SELECTED_ADDRESS",
  payload: address
});

// Thunk Actions
export const fetchAddresses = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("/user/address");
      const addresses = Array.isArray(response.data) ? response.data : [];
      dispatch(setAddressList(addresses));
    } catch (error) {
      console.error("Error fetching addresses:", error);
      dispatch(setAddressList([])); // Set empty array on error
    }
  };
};

export const createAddress = (addressData) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/user/address", addressData);
      dispatch(addAddress(response.data));
      return response.data;
    } catch (error) {
      console.error("Error creating address:", error);
      throw error;
    }
  };
};

export const editAddress = (addressData) => {
  return async (dispatch) => {
    try {
      const response = await api.put("/user/address", addressData);
      dispatch(updateAddress(response.data));
      return response.data;
    } catch (error) {
      console.error("Error updating address:", error);
      throw error;
    }
  };
};

export const deleteAddress = (addressId) => {
  return async (dispatch) => {
    try {
      await api.delete(`/user/address/${addressId}`);
      dispatch(removeAddress(addressId));
    } catch (error) {
      console.error("Error deleting address:", error);
      throw error;
    }
  };
};