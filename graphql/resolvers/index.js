// QUERYS
const userQuerys = require("./queries/users");

// MUTATIONS
const userMutation = require("./mutations/users");

// SUBSCRIPTION

const rootResolvers = {
  Query: {
    ...userQuerys,
  },
  Mutation: {
    ...userMutation,
  }
};
module.exports = rootResolvers;