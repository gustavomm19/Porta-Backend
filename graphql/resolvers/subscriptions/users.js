const { pubsub } = require("../../puhsub");
module.exports = {
    orderUpdate: {
    subscribe: () => pubsub.asyncIterator("ORDER_UPDATED"),
  }
};