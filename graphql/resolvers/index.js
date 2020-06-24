// QUERYS------------------------------------------------------

const userQuerys = require("./queries/users");
const solicitudQuerys = require("./queries/solicitudes");
const rateQuerys = require("./queries/rates");
const commentQuerys = require("./queries/comments");
const orderQuerys = require("./queries/orders");

// MUTATIONS---------------------------------------------------

const userMutation = require("./mutations/users");
const solicitudMutation = require("./mutations/solicitudes");
const rateMutation = require("./mutations/rates");
const commentMutation = require("./mutations/comments");
const orderMutation = require("./mutations/orders");

// SUBSCRIPTION------------------------------------------------

const rootResolvers = {
  Query: {
    ...userQuerys,
    ...solicitudQuerys,
    ...rateQuerys,
    ...commentQuerys,
    ...orderQuerys
  },
  Mutation: {
    ...userMutation,
    ...solicitudMutation,
    ...rateMutation,
    ...commentMutation,
    ...orderMutation
  }
};
module.exports = rootResolvers;