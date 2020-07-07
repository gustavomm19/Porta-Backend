const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const { createServer } = require("http");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const isAuth = require("./middleware/auth");
const subscriptions = require("./middleware/subscriptions");
const cors = require("cors");
const app = express();

const routes = require("./routes");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

//Morgan y multer (Middlewares)
app.use(morgan("dev"));

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});

app.use(multer({ storage }).single("image"));

//BodyParser is needed just for POST.
const port = process.env.PORT || 4000;

//Servidor
const serverGraphQL = new ApolloServer({
  typeDefs,
  resolvers,
  playground: !!(process.env.NODE_ENV !== "production"),
  context: isAuth,
  subscriptions,
});

//Apply server graphql in express
serverGraphQL.applyMiddleware({ app, cors: false });

const httpServer = createServer(app);
serverGraphQL.installSubscriptionHandlers(httpServer);
//Conexión con MongoDB Atlas
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-uxdk4.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    httpServer.listen({ port }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${serverGraphQL.graphqlPath}`
      );
      console.log(
        `🚀 Subscriptions ready at ws://localhost:${port}${serverGraphQL.subscriptionsPath}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
