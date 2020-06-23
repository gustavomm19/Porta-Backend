const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    _id: ID!
    cedula: String
    name: String
    lastName: String
    birthdate: String
    zone: String
    cellphone: String
    mail: String!
    password: String
    role: String!
    available: Boolean
    workingStatus: Boolean
    experience: String
    vehiculo: String
    licencia: String
    carnetCirculacion: String
    seguroVehiculo: String
    placaVehiculo: String
    rating: [Rate!]
    comments: [Comment!]
    createdAt: String!
    updatedAt: String!
    userImageURL: String
    userImageId: String
  }

  type AuthUser {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input UpdateUserInput {
    id: ID!
    mail: String!
    name: String!
    lastName: String!
    birthdate: String!
    zone: String
  }

  input UserInput {
    role: String!
    mail: String!
    password: String!
    name: String!
    lastName: String!
    birthdate: String!
    zone: String
    cellphone: String!
    cedula: String
    userImageURL: String
    userImageId: String
  }

  type Admin {
    _id: ID!
    name: String!
    lastName: String!
  }

  input AdminInput {
    mail: String!
    password: String!
  }

  type AuthAdmin {
    adminId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type Repartidor {
    _id: ID!
    role: String!
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
    repartidor: User
    experience: String!
    vehiculo: String!
    licencia: String!
    carnetCirculacion: String!
    seguroVehiculo: String!
    placaVehiculo: String
    status: Boolean
    createdAt: String!
    updatedAt: String!
  }

  input SolicitudInput {
    repartidorID: ID!
    vehiculo: String!
    licencia: String!
    experience: String!
    carnetCirculacion: String!
    seguroVehiculo: String!
    placaVehiculo: String!
  }

  input ReviewInput {
    id: ID!
    vehiculo: String!
    licencia: String!
    experience: String!
    carnetCirculacion: String!
    seguroVehiculo: String!
    status: Boolean!
  }

  type Rate {
    _id: ID!
    user: User!
    repartidor: Repartidor!
    score: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    _id: ID!
    user: User!
    repartidor: Repartidor!
    content: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User!]!
    newestUsers: [User!]!
    newestDrivers: [User!]!
    costumers:[User!]!
    drivers:[User!]!
    selectedDriver(driverId: ID!): User
    selectedRequest(solicitudId: ID!): Solicitud
    userLogin(mail: String!, password: String!, role: String!): AuthUser!
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
    comments: [Comment!]
  }

  type Mutation {
    createUser(userInput: UserInput): User
    updateUser(updateInput: UpdateUserInput): User
    changeAvailable: User
    createRepartidor(repartidorInput: RepartidorInput): Repartidor
    createAdmin(adminInput: AdminInput): Admin
    createSolicitud(solicitudInput: SolicitudInput): Solicitud
    reviewSolicitud(reviewInput: ReviewInput): Solicitud
    createRate(user: ID!, repartidor: ID!, score: Int!): Rate
    createComment(user: ID!, repartidor: ID!, content: String!): Comment
    updateComment(commentId: ID!, content: String!): Comment
  }
`;
