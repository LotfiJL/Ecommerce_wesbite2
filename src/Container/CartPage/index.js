import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Componenets/Layout/Layout";
import Card from "../../Componenets/UI/Card/card";
import CartItem from "./CartItem/index";
import { addToCart } from "../../actions/actions";
import "./style.css";
import { useEffect, useState } from "react";
import PriceDetails from "../../Componenets/PriceDetails";
const AddToCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.CartReducer);
  // const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  const onQuantityIncrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id]; //_id is the key
    dispatch(addToCart({ _id, name, price, img }, 1)); // we need to set the default qty to one + dispatch to update the store value
  };

  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };
  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <Card
          headerLeft={
            <div
              style={{ fontSize: "18px", fontWeight: "bold", color: "black" }}
            >
              My card
            </div>
          }
          headerRight={
            <div
              style={{ fontSize: "18px", fontWeight: "bold", color: "black" }}
            >
              Deliver in
            </div>
          }
        >
          {Object.keys(cartItems).map(
            //Object.keys(cartItems) returns array of the keys related to the cartItems object
            (key, index) => (
              <CartItem
                key={index}
                CartItem={cartItems[key]}
                onQuantityInc={onQuantityIncrement}
                onQuantityDec={onQuantityDecrement}
              />
            )
          )}
        </Card>
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
      </div>
    </Layout>
  );
};

export default AddToCart;
