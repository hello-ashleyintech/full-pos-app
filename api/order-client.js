const { Order } = require("./order");

const handleError = async function (handler) {
  try {
    await handler();
  } catch (error) {
    throw new Error("Failed to process command: " + error);
  }
};

class OrderClient {
  constructor(serializedClient) {
    this.client = serializedClient.aggregateClient(Order);
  }

  async createOrder(orderId) {
    await handleError(
      async () =>
        await this.client.create(orderId, (order) => {
          return order.createOrder(orderId);
        })
    );
  }
  async addItem(orderId, itemName, itemPrice) {
    await handleError(
      async () =>
        await this.client.update(orderId, (order) => {
          return order.addItem(itemName, itemPrice);
        })
    );
  }
  async completeOrder(orderId, total) {
    await handleError(
      async () =>
        await this.client.update(orderId, (order) => {
          return order.completeOrder(orderId, total);
        })
    );
  }
}

module.exports = OrderClient;
