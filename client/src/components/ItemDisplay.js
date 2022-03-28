import React, { useState } from "react";
import "./ItemDisplay.css";

export default function ItemDisplay(props) {
  var data = require("../data/items.json");
  const [itemsInOrder, setItemsInOrder] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  async function addItemToOrder(name, price) {
    // add in item to order
    var data = { orderId: props.orderId, itemName: name, itemPrice: price };
    var order = await fetch("http://localhost:9000/orders/add-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // if order was successful
    if (order.status === 200) {
      var roundedPrice = price.toFixed(2);
      // push item name to setItemsInOrder
      // add total to orderTotal
      setItemsInOrder([...itemsInOrder, { name: name, price: roundedPrice }]);
      setOrderTotal(orderTotal + price);
    }
  }

  async function completeOrder() {
    // add in item to order
    var data = { orderId: props.orderId, total: orderTotal };
    var order = await fetch("http://localhost:9000/orders/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // if order was successful
    if (order.status === 200) {
      props.setStartedOrder(false);
    }
  }

  function exitOrder() {
    props.setStartedOrder(false);
  }

  return (
    <div>
      <div>
        {data.items.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                addItemToOrder(item.name, item.price);
              }}
            >
              {item.name}
            </button>
          );
        })}
      </div>
      <div>
        <h2>Items Ordered</h2>
        <ul className="receipt">
          {itemsInOrder.map((item, index) => {
            return (
              <li key={index}>
                <div className="receiptEntry">
                  <div className="itemName">{item.name}</div>
                  <div className="itemPrice">{"$" + item.price}</div>
                </div>
              </li>
            );
          })}
        </ul>
        <p>
          <b>Order Total:</b> ${(Math.round(orderTotal * 100) / 100).toFixed(2)}
        </p>
      </div>
      <button
        onClick={() => {
          completeOrder();
        }}
      >
        Complete Order
      </button>
      <button
        onClick={() => {
          exitOrder();
        }}
      >
        Exit Order
      </button>
    </div>
  );
}
