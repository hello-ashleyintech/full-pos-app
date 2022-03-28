import React from "react";
import "./IndividualOrder.css";

export default function IndividualOrder(props) {
  return (
    <div>
      <h3>{"Order " + props.orderId}</h3>
      <ul className="receipt">
        {props.individualOrderItems.itemName.map((itemName, index) => {
          return (
            <li key={itemName + index}>
              <div className="receiptEntry">
                <div className="itemName">{itemName}</div>
                <div className="itemPrice">
                  {"$" +
                    (
                      Math.round(
                        props.individualOrderItems.itemPrice[index] * 100
                      ) / 100
                    ).toFixed(2)}
                </div>
              </div>
            </li>
          );
        })}
        <li key="orderTotal">
          <div className="receiptEntry">
            <div className="label">
              <b>Total</b>
            </div>
            <div className="itemPrice">
              <b>{"$" + props.orderTotal}</b>
            </div>
          </div>
        </li>
      </ul>
      <button
        onClick={() => {
          props.setViewIndividualOrder();
        }}
      >
        Back to Completed Orders 💰
      </button>
    </div>
  );
}
