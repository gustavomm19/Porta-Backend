const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const solicitudSchema = new Schema({
    repartidor: {
        type: Schema.Types.ObjectId,
        ref:'Users',
        require: true
    },
    vehiculo: {
        type:String,
        require: true
    },
    licencia: {
        type:String,
        require: true
    },
    experience: {
        type:String,
        require: true
    },
    carnetCirculacion: {
        type:String,
        require: true
    },
    seguroVehiculo: {
        type:String,
        require: true
    },
    placaVehiculo: {
      type: String,
      require: false,
    },
    status:{
        type: Boolean,
        required: false
    }
}, { timestamps: true} );

module.exports = mongoose.model('Solicitudes', solicitudSchema);