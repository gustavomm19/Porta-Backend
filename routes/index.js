const express = require("express");
const api = express.Router();
const controllers = require("../controllers");

api.post("/uploadImage", controllers.uploadImage);

api.get('/prueba', (req, res) => {
    res.send('Hola esto es una prueba')
});

module.exports = api;
