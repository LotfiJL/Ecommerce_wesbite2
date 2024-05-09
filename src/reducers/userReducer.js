import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "../actionsType/actionTypes";
import { toast } from "react-toastify";

const initState = {
  token: null,
  fullName: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
    fullName: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,

  error: null,
  message: "",
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true,
        loading: true,
      };
    case LOGIN_SUCCESS:
      toast.success(action.payload.message);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        fullName: action.payload.fullName,
        loading: false,
        authenticating: false,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      console.log("toast msg", action.payload);

      toast.success(action.payload?.message);

      return {
        ...initState,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case SIGNUP_REQUEST:
      break;
    case SIGNUP_SUCCESS:
      break;
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }

  return state;
};

export default userReducer;
