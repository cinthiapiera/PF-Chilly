import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  CREATE_PRODUCT,
  CREATE_DISCOUNT,
  PUT_PRODUCT,
  PUT_INVENTORY,
  FAIL_CREATED_MSG,
  PUT_DISCOUNT,
  DELETE_PRODUCT,
  GET_CATEGORY_DETAILS,
  FILTER1,
  FILTER_BY_DETAILS,
  GET_PRODUCT_BY_NAME,
} from "../actions/actions.js";

const initialState = {
  product: [],
  allProduct: [],
  productDetail: [],
  createProductMsg: "",
  productChangedMsg: "",
  productDeletedMsg: "",
  categoryDetails: [],


  page: 1,
  productPerPage: 30,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        product: action.payload,
        allProduct: action.payload,
        createProductMsg: "",
      };

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        productDetail: action.payload,
      };
    case GET_PRODUCT_BY_NAME:
      return {
        ...state,
        product: action.payload,
      };

    case CREATE_PRODUCT:
      return {
        ...state,
        createProductMsg: action.payload,
      };

    case CREATE_DISCOUNT:
      return {
        ...state,
      };
    case PUT_PRODUCT:
      return {
        ...state,
        productChangedMsg: action.payload,
      };
    case PUT_INVENTORY:
      return {
        ...state,
        productChangedMsg: action.payload,
      };
    case PUT_DISCOUNT:
      return {
        ...state,
        productChangedMsg: action.payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        productDeletedMsg: action.payload,
      };
    case FAIL_CREATED_MSG:
      return {
        ...state,
        createProductMsg: action.payload,
      };
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
        product: filtered2,
      };

    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    case "NEXT_PAGE":
      return {
        ...state,
        page: state.page + 1,
      };
    case "PREVIOUS_PAGE":
      return {
        ...state,
        page: state.page - 1,
      };

    default:
      return state;
  }
};

export default rootReducer;
