import React from "react";
import Card from "../../Componenets/UI/Card/card";
import { IoMdPricetag } from "react-icons/io";
import "./style.css";
const PriceDetails = (props) => {
  return (
    <Card headerLeft={"Price Details"} style={{ maxWidth: "380px" }}>
      <div
        style={{
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div
          className="flexRow sb"
          style={{
            margin: "10px 0",

            justifyContent: "space-between",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "20px", color: "red" }}>
            Price Details
          </div>
          <div className="itemsDetails"> {props.totalItem} items </div>
        </div>

        <div
          className="flexRow sb"
          style={{
            margin: "10px 0",
            display: "flex",
          }}
        >
          <IoMdPricetag
            style={{ fontSize: "30px", marginRight: "10px", color: "#4bcb53" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="TotalAmount">Total Amount</div>
            <div className="TotalPrice">{props.totalPrice}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PriceDetails;
