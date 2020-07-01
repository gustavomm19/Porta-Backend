const { pubsub } = require("../../puhsub");
const { withFilter } = require("apollo-server-express");

module.exports = {
  newMessage: {
    subscribe: withFilter( 
      () => pubsub.asyncIterator("NEW_MESSAGE"),
      ({ message }, { userId, orderId }) => {
        return message.receiver == userId && message.order == orderId;
      }
    )
  }
};