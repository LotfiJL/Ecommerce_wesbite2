import {
  GET_PRODUCTS_BY_SLUG,
  GET_PRODUCT_DETAILS_BY_ID_FAILURE,
  GET_PRODUCT_DETAILS_BY_ID_REQUEST,
  GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
  GET_PRODUCT_PAGE_FAILURE,
  GET_PRODUCT_PAGE_REQUEST,
  GET_PRODUCT_PAGE_SUCCESS,
} from "../actionsType/actionTypes";

const initState = {
  products: [],
  productsByPrice: {
    under5K: [],
    under10K: [],
    under15K: [],
    under20K: [],
    under30k: [],
  },
  pageRequest: false,
  page: {},
  error: null,
  productDetails: {},
  loading: false,
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_SLUG:
      return {
        ...state,
        products: action.payload.products,
        productsByPrice: action.payload.productByPrice,
      };

    case GET_PRODUCT_PAGE_REQUEST:
      return {
        ...state,
        pageRequest: true,
      };

    case GET_PRODUCT_PAGE_SUCCESS:
      return {
        ...state,
        page: action.payload.page,
        pageRequest: false,
      };

    case GET_PRODUCT_PAGE_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pageRequest: false,
      };
    case GET_PRODUCT_DETAILS_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        productDetails: action.payload.productDetails,
      };

    case GET_PRODUCT_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default productReducer;
