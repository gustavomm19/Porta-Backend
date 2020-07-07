const { PubSub } = require("apollo-server-express");

const pubsub = new PubSub();
exports.pubsub = pubsub;
