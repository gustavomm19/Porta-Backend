const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { ApolloServer } = require("apollo-server-express");
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const User = require('./models/users');

const app = express();


app.use(bodyParser.json());

// // bodyParser is needed just for POST.
const serverGraphQL = new ApolloServer({
    typeDefs,
    resolvers,
    playground: !!(process.env.NODE_ENV !== "production"),
    context: ({ req }) => ({}),
  });
  //apply server graphql in express
  serverGraphQL.applyMiddleware({ app, cors: false });

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
    }@cluster0-uxdk4.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});

