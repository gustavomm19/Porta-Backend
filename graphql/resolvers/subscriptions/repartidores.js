const { pubsub } = require("../../puhsub");
module.exports = {
  notificationAdded: {
    subscribe: () => pubsub.asyncIterator("NOTIFICATION_ADDED"),
  },
  notificationDeleted: {
    subscribe: () => pubsub.asyncIterator("NOTIFICATION_DELETED"),
  },
};
