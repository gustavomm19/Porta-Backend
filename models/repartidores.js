const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const repartidorSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    birthdate: {
        type: Date,
        require: true
    },
    mail: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    zone: {
        type: String,
        require: true
    },
    cellphone: {
        type: String,
        require: true
    },
    statuts: {
        type: String,
        require: true
    },
    hiringDate: {
        type: Date,
        require: true
    }
});

module.exports = mongoose.model('Repartidores', repartidorSchema);