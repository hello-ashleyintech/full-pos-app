const { DomainEvent } = require("@serialized/serialized-client");

class Order {
  get aggregateType() {
    return "order";
  }

  constructor(state) {
    this.orderId = state.orderId;
    this.items = state.items;
    this.total = state.total;
    this.completed = state.completed;
  }

  createOrder(orderId) {
    if (!orderId || orderId.length !== 36) throw "Invalid orderId";
    return [DomainEvent.create(new OrderCreated(orderId))];
  }

  addItem(itemName, itemPrice) {
    if (this.completed)
      throw "List cannot be changed since it has been completed";
    return [
      DomainEvent.create(new ItemAdded(this.orderId, itemName, itemPrice)),
    ];
  }

  completeOrder(orderId, total) {
    if (!this.completed) {
      return [DomainEvent.create(new OrderCompleted(orderId, total))];
    } else {
      // Don't emit event if already completed
      return [];
    }
  }

  get eventHandlers() {
    return {
      OrderCreated(state, event) {
        console.log("Handling OrderCreated", event);
        return OrderState.newState(event.orderId).withOrderId(event.orderId);
      },
      ItemAdded(state, event) {
        console.log("Handling ItemAdded", event);
        return new Order(state).addItem({
          orderId: event.orderId,
          itemName: event.itemName,
          itemPrice: event.itemPrice,
        });
      },
      OrderCompleted(state, event) {
        console.log("Handling OrderCompleted", event);
        return new Order(state).completeOrder({
          orderId: event.orderId,
          total: event.total,
        });
      },
    };
  }
}

class OrderCreated {
  constructor(orderId) {
    this.orderId = orderId;
  }
}

class ItemAdded {
  constructor(orderId, itemName, itemPrice) {
    this.orderId = orderId;
    this.itemName = itemName;
    this.itemPrice = itemPrice;
  }
}

class OrderCompleted {
  constructor(orderId, total) {
    this.orderId = orderId;
    this.total = total;
  }
}

class OrderState {
  constructor({ orderId, items = [], total = 0.0, completed = false }) {
    this.orderId = orderId;
    this.items = items;
    this.total = total;
    this.completed = completed;
  }

  static newState(orderId) {
    return new OrderState({ orderId });
  }

  withOrderId(orderId) {
    return Object.assign({}, this, { orderId });
  }

  addItem(itemName, itemPrice) {
    return Object.assign({}, this, {
      items: this.items.unshift({ itemName: itemName, itemPrice: itemPrice }),
    });
  }

  completeOrder(orderId, total) {
    return Object.assign({}, this, {
      completed: true,
      total: total,
      orderId: orderId,
    });
  }
}

module.exports = { Order };
