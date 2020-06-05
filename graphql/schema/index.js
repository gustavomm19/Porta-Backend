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
  
  type Admin {
    _id: ID!
    mail: String!
    password: String
  }

  input AdminInput{
    mail: String!
    password: String!
  }

  type AuthAdmin{
    adminId: ID!
    token: String!
    tokenExpiration: Int!
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

  type Solicitud {
    _id: ID!
     
    vehiculo: String!
    licencia: String!
    carnetCirculacion: String!
    seguroVehiculo: String!
  }

  input SolicitudInput {

    vehiculo: String!
    licencia: String!
    carnetCirculacion: String!
    seguroVehiculo: String!
  }

  type Query {
    users: [User!]!
    repartidores: [Repartidor!]!
    solicitudes: [Solicitud!]!
    userLogin(mail: String!, password: String!): AuthUser!
    admins: [Admin!]!
    adminLogin(mail: String!, password: String!): AuthAdmin!
  }

  type Mutation {
    createUser(userInput: UserInput): User
    createRepartidor(repartidorInput: RepartidorInput): Repartidor
    createAdmin(adminInput: AdminInput): Admin
    createSolicitud(solicitudInput: SolicitudInput): Solicitud
  }
`;
