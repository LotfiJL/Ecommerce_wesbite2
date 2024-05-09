import { ADD_TO_CART_SUCCESS } from "../actionsType/actionTypes";

const initState = {
  cartItems: {},
};

const CartReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };
    default:
      return state;
  }
};

export default CartReducer;
