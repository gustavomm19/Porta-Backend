const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    repartidor: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    content: {
        type: String,
        require: true
    }
}, { timestamps: true} );

module.exports = mongoose.model('Comment', commentSchema);