import React, { useState } from "react";
import ItemDisplay from "./ItemDisplay";
import "./POSHome.css";
import CompletedOrders from "./CompletedOrders";

export default function POSHome() {
  const [startedOrder, setStartedOrder] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [showOrders, setShowOrders] = useState(false);

  async function createOrder() {
    var generatedOrderId = crypto.randomUUID();
    var data = { orderId: generatedOrderId };
    var order = await fetch("http://localhost:9000/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    // if order was successful
    if (order.status === 200) {
      setStartedOrder(true);
      setOrderId(generatedOrderId);
    }
  }

  function showCompletedOrders() {
    setShowOrders(true);
  }

  return (
    <div>
      <h1>POS System ☕️</h1>
      {!startedOrder && !showOrders && (
        <div>
          <button onClick={createOrder}>Create Order</button>
          <button
            onClick={() => {
              showCompletedOrders();
            }}
          >
            View Completed Orders
          </button>
        </div>
      )}
      {startedOrder && (
        <ItemDisplay orderId={orderId} setStartedOrder={setStartedOrder} />
      )}
      {showOrders && <CompletedOrders setShowOrders={setShowOrders} />}
    </div>
  );
}
