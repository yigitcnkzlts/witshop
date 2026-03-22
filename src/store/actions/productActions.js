import api from "../../api/api";

// Action Creators
export const setCategories = (categories) => ({
  type: "SET_CATEGORIES",
  payload: categories
});

export const setProductList = (productList) => ({
  type: "SET_PRODUCT_LIST",
  payload: productList
});

export const setTotal = (total) => ({
  type: "SET_TOTAL",
  payload: total
});

export const setFetchState = (fetchState) => ({
  type: "SET_FETCH_STATE",
  payload: fetchState
});

export const setLimit = (limit) => ({
  type: "SET_LIMIT",
  payload: limit
});

export const setOffset = (offset) => ({
  type: "SET_OFFSET",
  payload: offset
});

export const setFilter = (filter) => ({
  type: "SET_FILTER",
  payload: filter
});

// Thunk Action Creator for fetching categories
export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      dispatch(setFetchState("FETCHING"));
      const response = await api.get("/categories");
      dispatch(setCategories(response.data));
      dispatch(setFetchState("FETCHED"));
    } catch (error) {
      console.error("Error fetching categories:", error);
      dispatch(setFetchState("FAILED"));
    }
  };
};

// Thunk Action Creator for fetching products
export const fetchProducts = (params = {}) => {
  return async (dispatch) => {
    try {
      dispatch(setFetchState("FETCHING"));
      
      // Build query parameters
      const queryParams = new URLSearchParams();
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.offset) queryParams.append('offset', params.offset);
      if (params.filter) queryParams.append('filter', params.filter);
      if (params.category) queryParams.append('category', params.category);
      if (params.sort) queryParams.append('sort', params.sort);
      
      const response = await api.get(`/products?${queryParams.toString()}`);
      
      // Response format: { total: 185, products: [...] }
      const { total, products } = response.data;
      
      dispatch(setTotal(total));
      dispatch(setProductList(products));
      dispatch(setFetchState("FETCHED"));
      
    } catch (error) {
      console.error("Error fetching products:", error);
      dispatch(setFetchState("FAILED"));
    }
  };
};