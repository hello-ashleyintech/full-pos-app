class ProjectionsClient {
  constructor(serializedClient) {
    this.client = serializedClient.projectionsClient();
  }

  async updateProjections() {
    await this.createOrdersProjection();
    await this.createOrderBreakdownProjection();
  }

  async createOrdersProjection() {
    try {
      console.log(`Updating projection: 'orders'`);
      await this.client.createOrUpdateDefinition({
        projectionName: "orders",
        feedName: "order",
        handlers: [
          {
            eventType: "OrderCompleted",
            functions: [
              {
                function: "set",
                eventSelector: "$.event.orderId",
                targetSelector: "$.projection.orderId",
              },
              {
                function: "set",
                eventSelector: "$.event.total",
                targetSelector: "$.projection.total",
              },
            ],
          },
        ],
      });
    } catch (e) {
      console.log("Error response: ", e);
    }
  }

  async createOrderBreakdownProjection() {
    try {
      console.log(`Updating projection: 'order breakdown'`);
      await this.client.createOrUpdateDefinition({
        projectionName: "order-breakdown",
        feedName: "order",
        handlers: [
          {
            eventType: "ItemAdded",
            functions: [
              {
                function: "append",
                eventSelector: "$.event.itemName",
                targetSelector: "$.projection.itemName",
              },
              {
                function: "append",
                eventSelector: "$.event.itemPrice",
                targetSelector: "$.projection.itemPrice",
              },
            ],
          },
        ],
      });
    } catch (e) {
      console.log("Error response: ", e);
    }
  }

  async findOrdersProjection() {
    return (
      await this.client.listSingleProjections(
        { projectionName: "orders" },
        { sort: "-updatedAt" }
      )
    ).projections;
  }

  async findOrderBreakdownProjection(orderId) {
    return await this.client.getSingleProjection({
      projectionName: "order-breakdown",
      projectionId: orderId,
    });
  }
}

module.exports = ProjectionsClient;
