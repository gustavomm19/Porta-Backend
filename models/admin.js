const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    role: {
        type: String,
        default:"ADMIN",
        require: true
    },
    mail: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }  
});

module.exports = mongoose.model('Admin', adminSchema);