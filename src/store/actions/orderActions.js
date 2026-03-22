import api from "../../api/api";

// Action Creators
export const setOrderList = (orders) => ({
  type: "SET_ORDER_LIST",
  payload: orders
});

export const addOrder = (order) => ({
  type: "ADD_ORDER",
  payload: order
});

export const clearCart = () => ({
  type: "CLEAR_CART"
});

// Thunk Actions
export const createOrder = (orderData) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/order", orderData);
      dispatch(addOrder(response.data));
      dispatch(clearCart()); // Clear cart after successful order
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };
};

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("/order");
      const orders = Array.isArray(response.data) ? response.data : [];
      dispatch(setOrderList(orders));
    } catch (error) {
      console.error("Error fetching orders:", error);
      dispatch(setOrderList([])); // Set empty array on error
    }
  };
};