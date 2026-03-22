
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

// Address Reducer
const addressInitialState = {
  addressList: [],
  selectedAddress: null
};

// Card Reducer
const cardInitialState = {
  cardList: [],
  selectedCard: null
};

// Order Reducer
const orderInitialState = {
  orderList: []
};

function shoppingCartReducer(state = shoppingCartInitialState, action) {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "CLEAR_CART":
      return { ...state, cart: [] };
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

function addressReducer(state = addressInitialState, action) {
  switch (action.type) {
    case "SET_ADDRESS_LIST":
      return { ...state, addressList: action.payload };
    case "ADD_ADDRESS":
      return { ...state, addressList: [...state.addressList, action.payload] };
    case "UPDATE_ADDRESS":
      return {
        ...state,
        addressList: state.addressList.map(addr =>
          addr.id === action.payload.id ? action.payload : addr
        )
      };
    case "REMOVE_ADDRESS":
      return {
        ...state,
        addressList: state.addressList.filter(addr => addr.id !== action.payload)
      };
    case "SET_SELECTED_ADDRESS":
      return { ...state, selectedAddress: action.payload };
    default:
      return state;
  }
}

function cardReducer(state = cardInitialState, action) {
  switch (action.type) {
    case "SET_CARD_LIST":
      return { ...state, cardList: action.payload };
    case "ADD_CARD":
      return { ...state, cardList: [...state.cardList, action.payload] };
    case "UPDATE_CARD":
      return {
        ...state,
        cardList: state.cardList.map(card =>
          card.id === action.payload.id ? action.payload : card
        )
      };
    case "REMOVE_CARD":
      return {
        ...state,
        cardList: state.cardList.filter(card => card.id !== action.payload)
      };
    case "SET_SELECTED_CARD":
      return { ...state, selectedCard: action.payload };
    default:
      return state;
  }
}

function orderReducer(state = orderInitialState, action) {
  switch (action.type) {
    case "SET_ORDER_LIST":
      return { ...state, orderList: action.payload };
    case "ADD_ORDER":
      return { ...state, orderList: [action.payload, ...state.orderList] };
    default:
      return state;
  }
}

// Combine all reducers
const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
  address: addressReducer,
  card: cardReducer,
  order: orderReducer
});
export default rootReducer;