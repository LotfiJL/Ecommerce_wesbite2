import React, { useState } from "react";

import "./style.css";

const CartItem = (props) => {
  const { name, price, img } = props.CartItem;

  const generatePublicUrl = (fileName) => {
    return `https://ecommerce-wesbite.onrender.com/public/${fileName}`;
  };

  // console.log("props.CartItem.qty", props.CartItem.qty);
  const [qtity, setQtity] = useState(props.CartItem.qty);

  const onQuantityIncrement = () => {
    //takes teh quantity on teh props and uopdate the state accordingly
    setQtity(qtity + 1);
    const { _id } = props.CartItem;
    props.onQuantityInc(_id, qtity + 1);
  };

  const onQuantityDecrement = () => {
    if (qtity <= 1) return;
    setQtity(qtity - 1);
    const { _id } = props.CartItem;
    props.onQuantityDec(_id, qtity - 1);
  };
  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={generatePublicUrl(img)} alt={""} />
        </div>
        <div className="cartItemDetails">
          <div>
            <p className="productName">{name}</p>
            <p className="productPrice">DTN. {price}</p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
        {/* quantity control */}
        <div className="quantityControl">
          <button onClick={onQuantityDecrement}>-</button>
          <input value={qtity} readOnly />
          <button onClick={onQuantityIncrement}>+</button>
        </div>
        <button className="cartActionBtn">save for later</button>
        <button className="cartActionBtn">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
