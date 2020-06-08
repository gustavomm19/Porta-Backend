const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    sesion:{
        type: Schema.Types.ObjectId,
        ref: 'Sesion'
    }
});

module.exports = mongoose.model('Admin', adminSchema);