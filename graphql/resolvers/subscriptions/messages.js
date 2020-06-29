const { pubsub } = require("../../puhsub");
module.exports = {
    newMessage: {
    subscribe: () => pubsub.asyncIterator("NEW_MESSAGE"),
  }
};