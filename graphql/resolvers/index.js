// QUERYS------------------------------------------------------

const userQuerys = require("./queries/users");
const solicitudQuerys = require("./queries/solicitudes");
const rateQuerys = require("./queries/rates");
const commentQuerys = require("./queries/comments");
const orderQuerys = require("./queries/orders");
const messageQuerys = require("./queries/messages");

// MUTATIONS---------------------------------------------------

const userMutation = require("./mutations/users");
const solicitudMutation = require("./mutations/solicitudes");
const rateMutation = require("./mutations/rates");
const commentMutation = require("./mutations/comments");
const orderMutation = require("./mutations/orders");
const messageMutation = require("./mutations/messages");

// SUBSCRIPTION------------------------------------------------
const repartidoresSubscription = require("./subscriptions/repartidores");


const rootResolvers = {
  Query: {
    ...userQuerys,
    ...solicitudQuerys,
    ...rateQuerys,
    ...commentQuerys,
    ...orderQuerys,
    ...messageQuerys
  },
  Mutation: {
    ...userMutation,
    ...solicitudMutation,
    ...rateMutation,
    ...commentMutation,
    ...orderMutation,
    ...messageMutation
  },
  Subscription: {
    ...repartidoresSubscription,
  },
};
module.exports = rootResolvers;
