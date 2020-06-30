const { pubsub } = require("../../puhsub");
module.exports = {
    orderAccepted: {
    subscribe: () => pubsub.asyncIterator("ORDER_ACCEPTED"),
  }
};