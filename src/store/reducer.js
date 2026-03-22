
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