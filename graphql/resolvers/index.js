// QUERYS------------------------------------------------------

const userQuerys = require("./queries/users");
const repartidorQuerys = require("./queries/repartidores");
const adminQuerys = require("./queries/admin");
const solicitudQuerys = require("./queries/solicitudes");

// MUTATIONS---------------------------------------------------

const userMutation = require("./mutations/users");
const repartidorMutation = require("./mutations/repartidores");
const adminMutation = require("./mutations/admin");
const solicitudMutation = require("./mutations/solicitudes");

// SUBSCRIPTION------------------------------------------------

const rootResolvers = {
  Query: {
    ...userQuerys,
    ...repartidorQuerys,
    ...adminQuerys,
    ...solicitudQuerys
  },
  Mutation: {
    ...userMutation,
    ...repartidorMutation,
    ...adminMutation,
    ...solicitudMutation
  }
};
module.exports = rootResolvers;