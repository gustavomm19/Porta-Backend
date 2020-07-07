const express = require("express");
const api = express.Router();
const controllers = require("../controllers");

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name:'portaapp',
    api_key:'563755334298556',
    api_secret:'YOnANVWzbdNitUBNs_HekDccpCc'
});

api.post("/uploadImage", controllers.uploadImage);

api.get('/prueba', (req, res) => {
    res.send('Hola esto es una prueba')
});

module.exports = api;
