const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    content: {
        type: String,
        require: true
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    messages: [
        {
          type: Schema.Types.ObjectId,
          ref: "Message",
        },
    ],
}, { timestamps: true} );

module.exports = mongoose.model('Message', messageSchema);