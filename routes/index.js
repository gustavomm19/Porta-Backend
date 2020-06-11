const express = require("express");
const api = express.Router();
const controllers = require("../controllers");

api.post("/uploadImage", controllers.uploadImage);

module.exports = api;
