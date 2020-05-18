const { gql } = require("apollo-server-express");
const User = require('../../models/users');

module.exports = gql`
    type User {
        _id: ID!
        name: String!
        lastName: String!
    }

    input UserInput {
        name: String!
        lastName: String!
    }

    type Query {
        users: [User!]!
    }

    type Mutation {
        createUser(userInput: UserInput): User
    }

    schema {
        query: Query
        mutation: Mutation
    }
    
`;