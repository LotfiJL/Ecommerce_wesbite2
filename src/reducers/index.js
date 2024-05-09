import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import CartReducer from "./cartReducer";

const rootReducer = combineReducers({
  categoryReducer: categoryReducer,
  productReducer: productReducer,
  userReducer: userReducer,
  CartReducer: CartReducer,
});

export default rootReducer;
