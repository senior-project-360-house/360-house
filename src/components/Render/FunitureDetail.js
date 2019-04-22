import React from "react";
import "./funituredetail.css";
const FunitureDetail = ({ funiture }) => {
  return (
    <div className="card">
      {/* 
      Name
      Price
      demension
      Wheretobuy
      */}

      <div className="header">{funiture.itemName} </div>
      <div className="content">
        <ul>
          <li>Price: {funiture.price}</li>
          <li>Demension: {funiture.demension}</li>
          <li>Where to buy: {funiture.buy}</li>
        </ul>
      </div>
    </div>
  );
};

export default FunitureDetail;
