import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  CREATE_PRODUCT,
  PUT_PRODUCT,
  DELETE_PRODUCT,
  PRODUCTS_DELETED,
  GET_PRODUCT_BY_NAME,
  RESTORE_PRODUCT,
  CREATE_DISCOUNT,
  PUT_DISCOUNT,
  PUT_INVENTORY,
  GET_CATEGORY_DETAILS,
  FILTER1,
  FILTER_BY_DETAILS,
  ORDER_BY_PRICE,
  ADD_TO_CART,
  DELETE_CART_PRODUCT,
  CLEAR_CART,
  UPDATE_CART_QUANTITY,
  INCREASE_PRODUCT_QUANTITY,
  DECREASE_PRODUCT_QUANTITY,
  ALL_USERS,
  CREATE_USER,
  USER_SPECIFIC,
  LOGOUT,
  GET_FAVORITES,
  ADD_FAVORITE,
  DELETE_FAVORITE,
  ERROR_MSSG,
  EUSEBIO,
  ERROR_PUT_PRODUCT,
  ERROR_CREATE_USER,
  USER_NOT_FOUND,
  CLEAR_PROD_MSG,
  MSG_NOT_PRODUCT_DELETED,
  CLEAR_FAV_MSG,
  CLEAR_FAV_STATE,
  FAIL_CREATED_MSG,
  CLEAR_DELETED_PRODUCTS,
  USER_ADMIN,
  PAY,
  CLEAR_PAYLINK,
} from "../actions/actions.js";

const initialState = {
  product: [],
  allProduct: [],
  productDetail: [],
  productsDeleted: [],
  createProductMsg: "",
  productChangedMsg: "",
  searchProductMsg: "",
  categoryDetails: [],
  cart: [],
  users: [],
  userInfo: {},
  userNotFound: "",
  createUserMsg: "",
  quantity: 0,
  favorites: [],
  favoriteMsg: "",
  msgProductDeleted: "",
  admin: false,
  paymentLink: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //! PRODUCTS REDUCER
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        product: action.payload,
        allProduct: action.payload,
        productDetail: [],
        createProductMsg: "",
        searchProductMsg: "",
        productChangedMsg: "",
      };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        productDetail: [action.payload],
      };
    case GET_PRODUCT_BY_NAME:
      return {
        ...state,
        product: action.payload,
        searchProductMsg: "",
      };

    case CREATE_PRODUCT:
      return {
        ...state,
        createProductMsg: action.payload,
      };
    case PUT_PRODUCT:
      return {
        ...state,
        productChangedMsg: action.payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        productDeletedMsg: action.payload,
      };
    case RESTORE_PRODUCT:
      return {
        ...state,
        productChangedMsg: action.payload,
      };
    case PRODUCTS_DELETED:
      return {
        ...state,
        productsDeleted: action.payload,
      };
    case CLEAR_DELETED_PRODUCTS:
      let detedProduct = state.productsDeleted.filter(
        (e) => e.id !== action.payload
      );
      return {
        ...state,
        productsDeleted: detedProduct,
      };
    //!DISCOUNTS REDUCER
    case CREATE_DISCOUNT:
      return {
        ...state,
      };
    case PUT_DISCOUNT:
      return {
        ...state,
      };
    //!INVENTORY REDUCER
    case PUT_INVENTORY:
      return {
        ...state,
      };
    //! PRODUCT CATEGORY DETAILS && FILTERS ACTIONS
    case GET_CATEGORY_DETAILS:
      return {
        ...state,
        categoryDetails: action.payload,
      };
    case FILTER1:
      let temporal = state.allProduct;
      let filtered = temporal.filter((e) => e.categoryName === action.payload);

      if (action.payload === "") {
        filtered = state.allProduct;
      }
      return {
        ...state,
        searchProductMsg: "",
        product: filtered,
      };
    case FILTER_BY_DETAILS:
      let temporal2 = state.allProduct;

      let filtered2 = temporal2.filter(
        (e) => e.categoryName === action.payload[0]
      );

      if (action.payload[0] === "") {
        filtered2 = state.allProduct;
      }

      for (const property in action.payload[1]) {
        filtered2 = filtered2.filter(
          (e) => e.details[0][property] === action.payload[1][property]
        );
      }
      return {
        ...state,
        searchProductMsg: "",
        product: filtered2,
      };
    case ORDER_BY_PRICE:
      const orderByPrice =
        action.payload === "Asc"
          ? state.product.sort((a, b) => {
              if (a.price - b.price < 0) return 1;
              else return -1;
            })
          : action.payload === "Dsc"
          ? state.product.sort((a, b) => {
              if (a.price - b.price > 0) return 1;
              else return -1;
            })
          : action.payload === "default"
          ? state.allProduct
          : "joder";
      return {
        ...state,
        state: orderByPrice,
      };
    //! CART ACTIONS
    case ADD_TO_CART:
      let prod = state.allProduct.find((e) => e.id === action.payload);
      let foundProd = state.cart.find((e) => e.id === action.payload);
      if (foundProd) {
        foundProd.quantity++;
      } else {
        prod.quantity = 1;
      }
      return {
        ...state,
        cart: prod.quantity === 1 ? state.cart.concat(prod) : state.cart,
      };
    case DELETE_CART_PRODUCT:
      let cart1 = state.cart.filter((e) => e.id !== action.payload);
      return {
        ...state,
        cart: cart1,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
        quantity: 0,
      };
    case UPDATE_CART_QUANTITY:
      let cartQuantity = 0;
      for (let i = 0; i < state.cart.length; i++) {
        cartQuantity = cartQuantity + state.cart[i].quantity;
      }
      return {
        ...state,
        quantity: cartQuantity,
      };
    case INCREASE_PRODUCT_QUANTITY:
      let product = state.cart.find((e) => e.id === action.payload);

      product.quantity = product.quantity + 1;

      return {
        ...state,
        quantity: state.quantity + 1,
      };

    case DECREASE_PRODUCT_QUANTITY:
      let product2 = state.cart.find((e) => e.id === action.payload);

      if (product2.quantity > 1) {
        product2.quantity = product2.quantity - 1;
      }
      let cartQuantity1 = 0;
      for (let i = 0; i < state.cart.length; i++) {
        cartQuantity1 = cartQuantity1 + state.cart[i].quantity;
      }
      return {
        ...state,
        quantity: cartQuantity1,
      };
    //! USERS REDUCERS
    case ALL_USERS:
      return {
        ...state,
        users: action.payload,
        createUserMsg: "",
      };
    case USER_SPECIFIC:
      return {
        ...state,
        userInfo: action.payload,
        createUserMsg: "",
      };
    case USER_ADMIN:
      return {
        ...state,
        admin: action.payload,
      };
    case CREATE_USER:
      return {
        ...state,
        createUserMsg: action.payload,
        userNotFound: "",
      };
    case LOGOUT:
      return {
        ...state,
        userInfo: [],
      };
    //! FAVOURITES REDUCERS
    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload.products,
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favoriteMsg: action.payload,
      };
    case DELETE_FAVORITE:
      return {
        ...state,
        favoriteMsg: action.payload,
      };
    case CLEAR_FAV_STATE:
      return {
        ...state,
        favorites: [],
      };
    //! ERRORS MSG REDUCERS
    case FAIL_CREATED_MSG:
      return {
        ...state,
        createProductMsg: action.payload,
      };
    case ERROR_MSSG:
      return {
        ...state,
        searchProductMsg: action.payload,
      };
    case ERROR_PUT_PRODUCT:
      return {
        ...state,
        productChangedMsg: action.payload,
      };
    case EUSEBIO:
      return {
        ...state,
        searchProductMsg: action.payload,
      };
    case ERROR_CREATE_USER:
      return {
        ...state,
        createUserMsg: action.payload,
      };
    case MSG_NOT_PRODUCT_DELETED:
      return {
        ...state,
        msgProductDeleted: action.payload,
      };
    case USER_NOT_FOUND:
      return {
        ...state,
        userNotFound: action.payload,
      };
    //! CLEAR MSG REDUCERS
    case CLEAR_PROD_MSG:
      return {
        ...state,
        createProductMsg: "",
        productChangedMsg: "",
      };
    case CLEAR_FAV_MSG:
      return {
        ...state,
        favoriteMsg: "",
      };
    case PAY:
      return {
        ...state,
        paymentLink: action.payload["init_point"],
      };
    case CLEAR_PAYLINK:
      return {
        ...state,
        paymentLink: "",
      };
    default:
      return state;
  }
};

export default rootReducer;