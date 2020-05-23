const { gql } = require("apollo-server-express");
const User = require('../../models/users');

module.exports = gql`
    type User {
        _id: ID!
        name: String!
        lastName: String!
        birthdate: String!
        mail: String!
        password:String!
        zone:String!
        cellphone:String!
    }

    input UserInput {
        name: String!
        lastName: String!
        birthdate: String!
        mail: String!
        password:String!
        zone:String!
        cellphone:String!
    }

    type Repartidor {
        _id: ID!
        name: String!
        lastName: String!
        birthdate: String!
        mail: String!
        password:String!
        zone:String!
        cellphone:String!
        status:String!
        hiringDate:String!
    }

    input RepartidorInput {
        name: String!
        lastName: String!
        birthdate: String!
        mail: String!
        password:String!
        zone:String!
        cellphone:String!
        status:String!
        hiringDate:String!
    }

// Querys-------------------------------------------------------------------------------------------------------------------
    
    type Query {
        users: [User!]!
    }

    type Query {
        repartidores: [Repartidor!]!
    }

// Mutations----------------------------------------------------------------------------------------------------------------
    
    type Mutation {
        createUser(userInput: UserInput): User
    }

    type Mutation {
        createRepartidor(repartidorInput: RepartidorInput): Repartidor
    }

// Schema-------------------------------------------------------------------------------------------------------------------

    schema {
        query: Query
        mutation: Mutation
    }
    
`;