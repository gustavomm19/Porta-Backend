const { gql } = require("apollo-server-express");

module.exports = gql`
  type Sesion {
    _id: ID!
    mail: String!
    password: String
    role: String!
    user: User
    repartidor: Repartidor
    admin: Admin
  }

  input SesionInput {
    role: String!
    name: String!
    lastName: String
    birthdate: String
    mail: String!
    password: String!
    zone: String
    cellphone: String
    cedula: String
  }

  type User {
    _id: ID!
    name: String!
    lastName: String!
    birthdate: String!
    zone: String!
    cellphone: String!
    createdAt: String!
    updatedAt: String!
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
    zone: String!
    cellphone: String!
  }
  
  type Admin {
    _id: ID!
    name: String!
    lastName: String!
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
    cedula: String!
    name: String!
    lastName: String!
    birthdate: String!
    zone: String!
    cellphone: String!
    available: Boolean!
    workingStatus: Boolean!
    vehiculo: String
    licencia: String
    carnetCirculacion: String
    seguroVehiculo: String
    rating: [Rate!]
    createdAt: String!
    updatedAt: String!
  }

  input RepartidorInput {
    cedula: String!
    name: String!
    lastName: String!
    birthdate: String!
    mail: String!
    password: String!
    zone: String!
    cellphone: String!
  }

  type AuthRepartidor {
    repartidorId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type Solicitud {
    _id: ID!
    vehiculo: String!
    licencia: String!
    carnetCirculacion: String!
    seguroVehiculo: String!
    status: Boolean
    createdAt: String!
    updatedAt: String!
  }

  input SolicitudInput {
    vehiculo: String!
    licencia: String!
    carnetCirculacion: String!
    seguroVehiculo: String!
  }

  type Rate{
    _id: ID!
    user: User!
    repartidor: Repartidor!
    score:Int!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User!]!
    newestUsers: [User!]!
    userLogin(mail: String!, password: String!): AuthUser!
    currentUser: User
    repartidores: [Repartidor!]!
    newestRepartidores: [Repartidor!]!
    repartidorLogin(mail: String!, password: String!): AuthRepartidor!
    currentRepartidor: Repartidor
    admins: [Admin!]!
    adminLogin(mail: String!, password: String!): AuthAdmin!
    currentAdmin: Admin
    solicitudes: [Solicitud!]!
    rates: [Rate!]!
    sesions: [Sesion!]!
    
  }

  type Mutation {
    createUser(userInput: UserInput): User
    createRepartidor(repartidorInput: RepartidorInput): Repartidor
    createAdmin(adminInput: AdminInput): Admin
    createSolicitud(solicitudInput: SolicitudInput): Solicitud
    createRate(user: ID!, repartidor: ID!, score: Int!): Rate
    createSesion(sesionInput: SesionInput): Sesion
  }
`;
