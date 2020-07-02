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
    currentOrder: Order
    role: String!
    latitud: String
    longitud: String
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
    orders: [Order!]
    conversations: [Conversation!]
    userImageURL: String
    userImageId: String
    createdAt: String!
    updatedAt: String!
  }

  type AuthUser {
    user: User!
    token: String!
    tokenExpiration: Int!
  }

  input UpdateUserInput {
    id: String!
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

  type Solicitud {
    _id: ID
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
    repartidorID: String!
    vehiculo: String!
    licencia: String!
    experience: String!
    carnetCirculacion: String!
    seguroVehiculo: String!
    placaVehiculo: String!
  }

  input ReviewInput {
    id: String!
    vehiculo: String!
    placaVehiculo: String!
    licencia: String!
    experience: String!
    carnetCirculacion: String!
    seguroVehiculo: String!
    status: Boolean!
  }

  type Rate {
    _id: ID!
    user: User!
    repartidor: User!
    score: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    _id: ID!
    user: User!
    repartidor: User!
    content: String!
    createdAt: String!
    updatedAt: String!
  }

  type Order {
    _id: ID!
    user: User!
    repartidor: User
    pickUp: String!
    deliver: String!
    km: Int!
    price: Int!
    status: String!
    concluded: Boolean
    messages: [Message!]
    createdAt: String!
    updatedAt: String!
  }

  input OrderInput {
    user: String!
    pickUp: String!
    deliver: String!
    km: Int!
    price: Int!
  }

  type Message {
    _id: ID!
    conversation: Conversation
    order: Order!
    sender: User!
    receiver: User!
    content: String!
    createdAt: String!
    updatedAt: String!
  }

  input MessageInput {
    conversation: String
    order: String!
    sender: String!
    receiver: String!
    content: String!
  }

  type Conversation {
    _id: ID!
    participants: [User!]
    messages: [Message!]
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User!]!
    newestUsers: [User!]!
    newestDrivers: [User!]!
    costumers: [User!]!
    drivers: [User!]!
    driversAroundMe: [User!]!
    selectedDriver(driverId: String!): User
    selectedRequest(solicitudId: String!): Solicitud
    userLogin(mail: String!, password: String!, role: String!): AuthUser!
    currentUser: User
    solicitudes: [Solicitud!]!
    newestRequests: [Solicitud!]!
    rates: [Rate!]!
    comments: [Comment!]
    orders: [Order!]
    newOrders: [Order!]!
    pendingOrders: [Order!]!
    messages(order: String!): [Message!]!
    getCurrentOrder: Order
  }

  type Mutation {
    createUser(userInput: UserInput): User
    updateUser(updateInput: UpdateUserInput): User
    userLogin(mail: String!, password: String!, role: String!): AuthUser!
    changeAvailable(lat: String, lng: String): User
    createSolicitud(solicitudInput: SolicitudInput): Solicitud
    reviewSolicitud(reviewInput: ReviewInput): Solicitud
    createRate(user: String!, repartidor: String!, score: Int!): Rate
    createComment(user: String!, repartidor: String!, content: String!): Comment
    updateComment(commentId: String!, content: String!): Comment
    createOrder(orderInput: OrderInput): Order
    acceptOrder(orderId: String!, repartidor: String!): Order
    createMessage(messageInput: MessageInput!): Message
    updateLocationDriver(lat: String, lng: String): User
  }

  type Subscription {
    notificationAdded: Order
    notificationDeleted: Order
    newMessage(orderId: String!): Message!
    orderUpdate(userId: String!): Order
  }
`;
