// QUERYS------------------------------------------------------

const userQuerys = require("./queries/users");
const repartidorQuerys = require("./queries/repartidores");
const adminQuerys = require("./queries/admin");

// MUTATIONS---------------------------------------------------

const userMutation = require("./mutations/users");
const repartidorMutation = require("./mutations/repartidores");
const adminMutation = require("./mutations/admin");

// SUBSCRIPTION------------------------------------------------

const rootResolvers = {
  Query: {
    ...userQuerys,
    ...repartidorQuerys,
    ...adminQuerys
  },
  Mutation: {
    ...userMutation,
    ...repartidorMutation,
    ...adminMutation
  }
};
module.exports = rootResolvers;