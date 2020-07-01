const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    repartidor: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    pickUp: {
        type: String,
        require: true
    },
    deliver: {
        type: String,
        require: true
    },
    km: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    concluded: {
        type: Boolean,
        require: false
    },
    messages: [
        {
          type: Schema.Types.ObjectId,
          ref: "Message",
        },
    ],
}, { timestamps: true} );

module.exports = mongoose.model('Order', orderSchema);