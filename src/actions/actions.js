import axios from "../helpers/axios";
import store from "../store/store";

import {
  ADD_TO_CART_SUCCESS,
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_PRODUCTS_BY_SLUG,
  GET_PRODUCT_DETAILS_BY_ID_FAILURE,
  GET_PRODUCT_DETAILS_BY_ID_REQUEST,
  GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
  GET_PRODUCT_PAGE_FAILURE,
  GET_PRODUCT_PAGE_REQUEST,
  GET_PRODUCT_PAGE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "../actionsType/actionTypes";

//-----------categ----------------

export const getCategories = () => {
  return async (dispatch) => {
    dispatch({ type: GET_CATEGORIES_REQUEST });
    const res = await axios.get(
      `https://ecommerce-wesbite.onrender.com/api/category/getCategory`
    );
    if (res.status === 200) {
      const { categoryList, message } = res.data;
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: { categories: categoryList, message },
      });
    } else {
      dispatch({
        type: GET_CATEGORIES_FAILURE,
        payload: { error: res.data.error, message: res.data.message },
      });
    }
  };
};

/****************************************** */

export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(
      `https://ecommerce-wesbite.onrender.com/api/products/${slug}`
    );
    if (res.status === 200) {
      dispatch({
        type: GET_PRODUCTS_BY_SLUG,
        payload: res.data,
      });
    } else {
      // dispatch({
      //     type:
      // })
    }
  };
};

/*************************************** */

export const getProductsPage = (payload) => {
  return async (dispatch) => {
    const { cid, type } = payload.params;
    dispatch({ type: GET_PRODUCT_PAGE_REQUEST });
    const res = await axios.get(`/page/${cid}/${type}`);
    if (res.status === 200) {
      const { page, message } = res.data;
      dispatch({
        type: GET_PRODUCT_PAGE_SUCCESS,
        payload: { page, message },
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: GET_PRODUCT_PAGE_FAILURE,
        payload: { error, message: res.data.message },
      });
    }
  };
};

///************************Login--logout ... */

// new update signup action
export const signupp = (user) => {
  return async (dispatch) => {
    let res;
    try {
      dispatch({ type: SIGNUP_REQUEST });
      res = await axios.post(`/signup`, user);
      if (res.status === 201) {
        dispatch({ type: SIGNUP_SUCCESS });
        const { token, user, message } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token,
            user,
            message,
          },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: SIGNUP_FAILURE,
          payload: { error, message: res.data.message },
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: SIGNUP_FAILURE,
        payload: { error: data.error, message: data.message },
      });
    }
  };
};

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    const res = await axios.post(`/signin`, {
      ...user,
    });
    console.log("res", res);

    if (res.status === 200) {
      const { token, user, fullName, message } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("fullName", fullName);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
          user,
          fullName,
          message,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = localStorage.getItem("user");
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });
    // localStorage.removeItem('user');
    // localStorage.removeItem('token');
    localStorage.clear();
    dispatch({ type: LOGOUT_SUCCESS });
    const res = await axios.post(`/admin/signout`);
    console.log("res", res);

    if (res.status === 200) {
      const { message } = res.data;
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: { message },
      });
    }

    // }else{
    //     dispatch({
    //         type: authConstants.LOGOUT_FAILURE,
    //         payload: { error: res.data.error }
    //     });
    // }
  };
};

/*********PROD */

export const getProductDetailsById = (payload) => {
  return async (dispatch) => {
    dispatch({ type: GET_PRODUCT_DETAILS_BY_ID_REQUEST });
    let res;
    try {
      const { productId } = payload.params;
      res = await axios.get(`/product/${productId}`);
      dispatch({
        type: GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
        payload: { productDetails: res.data.product },
      });
    } catch (error) {
      dispatch({
        type: GET_PRODUCT_DETAILS_BY_ID_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

/******************CART */

export const addToCart = (product, updatedqty = 1) => {
  return async (dispatch) => {
    const { cartItems } = store.getState().CartReducer; // {_id: '661bc22596889d481ba4e5fb', name: 'SMARTPHONE SAMSUNG,qty,price,img}

    // Mettre à jour la quantité du produit dans le panier
    const qty = cartItems[product._id] // while trying to + or -
      ? parseInt(cartItems[product._id].qty + updatedqty) //parseInt converir en entier la somme even it is not mandatory both are integer
      : 1;

    // Mettre à jour le panier dans le stockage local
    cartItems[product._id] = { ...product, qty };
    localStorage.setItem("cart", JSON.stringify(cartItems));
    // Dispatch de l'action pour ajouter au panier
    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });
  };
};

export const updateCart = () => {
  return async (dispatch) => {
    const cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;

    if (cartItems) {
      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: { cartItems },
      });
    }
  };
};
