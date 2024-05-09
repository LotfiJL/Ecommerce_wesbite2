import React from "react";
import "./card.css";
function Card(props) {
  return (
    // {...props} des props comme id, onClick, style, etc. au composant Card, elles seront automatiquement appliquées à l'élément <div> avec la classe "card"
    <div className="card" {...props}>
      <div
        className="cardHeader"
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "black",
        }}
      >
        {props.headerLeft && <div>{props.headerLeft}</div>}
        {props.headerRight && props.headerRight}
      </div>

      {props.children}
    </div>
  );
}

export default Card;
