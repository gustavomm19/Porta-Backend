const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const isAuth = require("./middleware/auth");
const User = require("./models/users");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(isAuth);

// // bodyParser is needed just for POST.
const port = process.env.PORT || 4000;
const serverGraphQL = new ApolloServer({
  typeDefs,
  resolvers,
  playground: !!(process.env.NODE_ENV !== "production"),
  context: ({req}) =>({token: req.token}),
});
//apply server graphql in express
serverGraphQL.applyMiddleware({ app, cors: false });

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-uxdk4.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
