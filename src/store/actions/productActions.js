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

export const setProductDetail = (product) => ({
  type: "SET_PRODUCT_DETAIL",
  payload: product
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
  return async (dispatch, getState) => {
    try {
      dispatch(setFetchState("FETCHING"));
      
      // Get current state for pagination
      const { product } = getState();
      
      // Build query parameters
      const queryParams = new URLSearchParams();
      
      // Use provided params or current state
      const limit = params.limit || product.limit;
      const offset = params.offset || product.offset;
      
      queryParams.append('limit', limit);
      queryParams.append('offset', offset);
      
      if (params.filter) queryParams.append('filter', params.filter);
      if (params.category) queryParams.append('category', params.category);
      if (params.sort) queryParams.append('sort', params.sort);
      
      // Update state with new params
      if (params.limit !== undefined) dispatch(setLimit(params.limit));
      if (params.offset !== undefined) dispatch(setOffset(params.offset));
      if (params.filter !== undefined) dispatch(setFilter(params.filter));
      
      const response = await api.get(`/products?${queryParams.toString()}`);
      
      // Response format: { total: 185, products: [...] }
      const { total, products } = response.data;
      
      dispatch(setTotal(total));
      
      // For pagination, append products if offset > 0, otherwise replace
      if (params.offset > 0) {
        const currentProducts = getState().product.productList;
        dispatch(setProductList([...currentProducts, ...products]));
      } else {
        dispatch(setProductList(products));
      }
      
      dispatch(setFetchState("FETCHED"));
      
    } catch (error) {
      console.error("Error fetching products:", error);
      dispatch(setFetchState("FAILED"));
    }
  };
};

// Thunk Action Creator for fetching single product
export const fetchProductDetail = (productId) => {
  return async (dispatch) => {
    try {
      dispatch(setFetchState("FETCHING"));
      const response = await api.get(`/products/${productId}`);
      dispatch(setProductDetail(response.data));
      dispatch(setFetchState("FETCHED"));
    } catch (error) {
      console.error("Error fetching product detail:", error);
      dispatch(setFetchState("FAILED"));
    }
  };
};