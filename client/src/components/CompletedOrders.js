import React, { useEffect, useState } from "react";
import "./CompletedOrders.css";
import IndividualOrder from "./IndividualOrder";

export default function CompletedOrders(props) {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [viewIndividualOrder, setViewIndividualOrder] = useState(false);
  const [individualOrderItems, setIndividualOrderItems] = useState([]);
  const [individualOrderId, setIndividualOrderId] = useState("");
  const [individualOrderTotal, setIndividualOrderTotal] = useState("");

  async function getCompletedOrders() {
    // api call to get all completed orders
    fetch("http://localhost:9000/projections", {
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((orders) => {
        setCompletedOrders(orders);
      });
  }

  function navigateBackToHome() {
    props.setShowOrders(false);
  }

  useEffect(() => {
    getCompletedOrders();
  }, []);

  function clickOrder(orderId, orderTotal) {
    var data = { orderId: orderId };
    // api call to get individual items in a specific order
    fetch("http://localhost:9000/projections/individual-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((orders) => {
        setIndividualOrderItems(orders.data);
        setIndividualOrderId(orderId);
        setIndividualOrderTotal(orderTotal);
        setViewIndividualOrder(true);
      });
  }

  return (
    <div>
      {!viewIndividualOrder && (
        <ul>
          <div className="orderEntry">
            <div>
              <h2>Order ID</h2>
            </div>
            <div>
              <h2>Total</h2>
            </div>
          </div>
          {completedOrders.map((order) => {
            return (
              <li key={order.data.orderId}>
                <div className="orderEntry">
                  <button
                    className="order"
                    onClick={() =>
                      clickOrder(
                        order.data.orderId,
                        (Math.round(order.data.total * 100) / 100).toFixed(2)
                      )
                    }
                  >
                    {"Order " + order.data.orderId}
                  </button>
                  <div className="orderTotal">
                    {"$" +
                      (Math.round(order.data.total * 100) / 100).toFixed(2)}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {viewIndividualOrder && (
        <IndividualOrder
          setViewIndividualOrder={setViewIndividualOrder}
          individualOrderItems={individualOrderItems}
          orderId={individualOrderId}
          orderTotal={individualOrderTotal}
        />
      )}
      <button
        onClick={() => {
          navigateBackToHome();
        }}
      >
        Back to Home 🏠
      </button>
    </div>
  );
}
