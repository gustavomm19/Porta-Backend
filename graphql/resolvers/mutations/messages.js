const Message = require("../../../models/messages");
const Conversation = require("../../../models/conversations");
const User = require("../../../models/users");
const { pubsub } = require("../../puhsub");


const user = async (userId) => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            _id: user.id,
            password: null,
            birthdate: new Date(user._doc.birthdate).toISOString(),
            createdAt: new Date(user._doc.createdAt).toISOString(),
            updatedAt: new Date(user._doc.updatedAt).toISOString(),
        };
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createMessage: async (_, args) => {
        try {

            let conversation
            conversation = await Conversation.findOne({
                $or: [
                    { 'participants': [args.messageInput.sender, args.messageInput.receiver] },
                    { 'participants': [args.messageInput.receiver, args.messageInput.sender] }
                ]
            });

            if (!conversation) {
                const sender = await User.findById(args.messageInput.sender);
                const receiver = await User.findById(args.messageInput.receiver);
                conversation = new Conversation({
                    participants: [args.messageInput.sender, args.messageInput.receiver],
                });
                await conversation.save();
                sender.conversations.push(conversation);
                receiver.conversations.push(conversation);
                await sender.save();
                await receiver.save();
            }

            const message = new Message({
                sender: args.messageInput.sender,
                receiver: args.messageInput.receiver,
                content: args.messageInput.content,
                conversation: conversation._id,
            });

            await message.save();
            conversation.messages.push(message);
            await conversation.save();

            const createdMessage = {
                ...message._doc,
                createdAt: new Date(message._doc.createdAt).toISOString(),
                updatedAt: new Date(message._doc.updatedAt).toISOString(),
                sender: user.bind(this, message.sender),
                receiver: user.bind(this, message.receiver)
            }

            pubsub.publish("NEW_MESSAGE", {
                newMessage: createdMessage,
            });

            return createdMessage

        } catch (err) {
            console.log(err);
            throw err;
        }

    },
    createNewMessage: async (_, args) => {
        try {
            let order
            const message = new Message({
                sender: args.messageInput.sender,
                receiver: args.messageInput.receiver,
                content: args.messageInput.content,
                order: args.messageInput.order,
            });
            const createdMessage = await message.save();
            order = await Message.findById(args.messageInput.order);
            order.messages.push(message);

            await order.save();

            return {
                ...createdMessage,
                createdAt: new Date(createdMessage._doc.createdAt).toISOString(),
                updatedAt: new Date(createdMessage._doc.updatedAt).toISOString(),
                sender: user.bind(this, createdMessage.sender),
                receiver: user.bind(this, createdMessage.receiver)
            }

        } catch (err) {
            console.log(err);
            throw err;
        }
    },

};