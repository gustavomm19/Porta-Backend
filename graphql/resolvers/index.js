// QUERYS------------------------------------------------------

const userQuerys = require("./queries/users");
const repartidorQuerys = require("./queries/repartidores");
const adminQuerys = require("./queries/admin");
const solicitudQuerys = require("./queries/solicitudes");
const rateQuerys = require("./queries/rates");
const sesionQuerys = require("./queries/sesion");

// MUTATIONS---------------------------------------------------

const userMutation = require("./mutations/users");
const repartidorMutation = require("./mutations/repartidores");
const adminMutation = require("./mutations/admin");
const solicitudMutation = require("./mutations/solicitudes");
const rateMutation = require("./mutations/rates");
const sesionMutation = require("./mutations/sesion");

// SUBSCRIPTION------------------------------------------------

const rootResolvers = {
  Query: {
    ...userQuerys,
    ...repartidorQuerys,
    ...adminQuerys,
    ...solicitudQuerys,
    ...rateQuerys,
    ...sesionQuerys
  },
  Mutation: {
    ...userMutation,
    ...repartidorMutation,
    ...adminMutation,
    ...solicitudMutation,
    ...rateMutation,
    ...sesionMutation
  }
};
module.exports = rootResolvers;