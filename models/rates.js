const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rateSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    repartidor: {
        type: Schema.Types.ObjectId,
        ref: 'Repartidores'
    },
    score: {
        type: Number,
        require: true
    }
}, { timestamps: true} );

module.exports = mongoose.model('Rate', rateSchema);