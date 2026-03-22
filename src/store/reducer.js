
import { combineReducers } from "redux";

// Client Reducer
const clientInitialState = {
  user: {},
  addressList: [],
  creditCards: [],
  roles: [],
  theme: "light",
  language: "en"
};

function clientReducer(state = clientInitialState, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_ROLES":
      return { ...state, roles: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    default:
      return state;
  }
}

// Product Reducer
const productInitialState = {
  categories: [],
  productList: [],
  productDetail: null,
  total: 0,
  limit: 25,
  offset: 0,
  filter: "",
  fetchState: "NOT_FETCHED" // "NOT_FETCHED", "FETCHING", "FETCHED", "FAILED"
};

function productReducer(state = productInitialState, action) {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_PRODUCT_LIST":
      return { ...state, productList: action.payload };
    case "SET_TOTAL":
      return { ...state, total: action.payload };
    case "SET_FETCH_STATE":
      return { ...state, fetchState: action.payload };
    case "SET_LIMIT":
      return { ...state, limit: action.payload };
    case "SET_OFFSET":
      return { ...state, offset: action.payload };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "SET_PRODUCT_DETAIL":
      return { ...state, productDetail: action.payload };
    default:
      return state;
  }
}

// Shopping Cart Reducer
const shoppingCartInitialState = {
  cart: [], // [{ count: 1, product: { id: "1235", ... } }]
  payment: {},
  address: {}
};

function shoppingCartReducer(state = shoppingCartInitialState, action) {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "ADD_TO_CART": {
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, count: item.count + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { count: 1, checked: true, product: action.payload }]
        };
      }
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };
    case "UPDATE_CART_ITEM_COUNT":
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, count: Math.max(0, action.payload.count) }
            : item
        ).filter(item => item.count > 0)
      };
    case "TOGGLE_CART_ITEM_CHECK":
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload
            ? { ...item, checked: !item.checked }
            : item
        )
      };
    case "SET_PAYMENT":
      return { ...state, payment: action.payload };
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    default:
      return state;
  }
}

// Combine all reducers
const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer
});

export default rootReducer;