const { pubsub } = require("../../puhsub");
module.exports = {
  notificationAdded: {
    subscribe: () => pubsub.asyncIterator("NOTIFICATION_ADDED"),
  },
};
