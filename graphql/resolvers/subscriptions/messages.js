const { pubsub } = require("../../puhsub");
const { withFilter } = require("apollo-server-express");

module.exports = {
  newMessage: {
    subscribe: withFilter(
      () => pubsub.asyncIterator("NEW_MESSAGE"),
      ({ newMessage }, { orderId }) => {
        return newMessage.order == orderId;
      }
    ),
  },
};
