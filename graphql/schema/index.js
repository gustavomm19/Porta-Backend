const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    _id: ID!
    name: String!
    lastName: String!
    birthdate: String!
    mail: String!
    password: String
    zone: String!
    cellphone: String!
  }

  type AuthUser {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input UserInput {
    name: String!
    lastName: String!
    birthdate: String!
    mail: String!
    password: String!
    zone: String!
    cellphone: String!
  }

  type Repartidor {
    _id: ID!
    name: String!
    lastName: String!
    birthdate: String!
    mail: String!
    password: String!
    zone: String!
    cellphone: String!
    status: String!
    hiringDate: String!
  }

  input RepartidorInput {
    name: String!
    lastName: String!
    birthdate: String!
    mail: String!
    password: String!
    zone: String!
    cellphone: String!
    status: String!
    hiringDate: String!
  }

  type Query {
    users: [User!]!
    repartidores: [Repartidor!]!
    currentUser: User
    userLogin(mail: String!, password: String!): AuthUser!
  }

  type Mutation {
    createUser(userInput: UserInput): User
    createRepartidor(repartidorInput: RepartidorInput): Repartidor
  }
`;
