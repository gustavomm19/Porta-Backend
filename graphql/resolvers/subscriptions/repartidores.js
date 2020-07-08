const { pubsub } = require("../../puhsub");
module.exports = {
  notificationAdded: {
    subscribe: () => pubsub.asyncIterator("NOTIFICATION_ADDED"),
  },
  notificationDeleted: {
    subscribe: () => pubsub.asyncIterator("NOTIFICATION_DELETED"),
  },
  addDriver: {
    subscribe: () => pubsub.asyncIterator("DRIVER_ADDED"),
  },
  orderComplete: {
    subscribe: withFilter( 
      () => pubsub.asyncIterator("ORDER_COMPLETED"),
      ({ order }, { driverId }) => {
        return order.repartidor == driverId;
      }
    )
  }
};
