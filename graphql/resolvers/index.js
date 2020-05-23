// QUERYS------------------------------------------------------

const userQuerys = require("./queries/users");
const repartidorQuerys = require("./queries/repartidores");

// MUTATIONS---------------------------------------------------

const userMutation = require("./mutations/users");
const repartidorMutation = require("./mutations/repartidores");

// SUBSCRIPTION------------------------------------------------

const rootResolvers = {
  Query: {
    ...userQuerys,
    ...repartidorQuerys,
  },
  Mutation: {
    ...userMutation,
    ...repartidorMutation,
  }
};
module.exports = rootResolvers;