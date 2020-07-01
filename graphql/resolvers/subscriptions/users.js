const { pubsub } = require("../../puhsub");
const { withFilter } = require("apollo-server-express");

module.exports = {
    orderUpdate: {
    subscribe: withFilter( 
      () => pubsub.asyncIterator("ORDER_UPDATED"),
      (payload, variables) => {
        return payload.orderUpdate.user === variables.user;
      }
    )
  }
};