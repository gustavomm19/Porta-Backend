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
        conversation = await Message.find(
        { $or:[ {'participants':[args.MessageInput.sender, args.MessageInput.receiver]}, 
        {'participants':[args.MessageInput.receiver, args.MessageInput.sender]}  ]});

        if(!conversation){
            const sender = await User.findById(args.MessageInput.sender);
            const receiver = await User.findById(args.MessageInput.receiver);

            conversation = new Conversation({
                participants: [args.MessageInput.sender, args.MessageInput.receiver],
            });
            await conversation.save();
            sender.conversations.push(conversation);
            receiver.conversations.push(conversation);
            await sender.save();
            await receiver.save();
        }

        const message = new Message({
            sender: args.MessageInput.sender,
            receiver: args.MessageInput.receiver,
            content: args.MessageInput.content,
            conversation: conversation._id,
        });

        await message.save();
        conversation.messages.push(message);
        await conversation.save();

        return {
            ...message._doc,
            createdAt: new Date(user._doc.createdAt).toISOString(),
            updatedAt: new Date(user._doc.updatedAt).toISOString(),
            sender: user.bind(this, message.sender),
            receiver: user.bind(this, message.receiver)
        }

    } catch (err) {
      console.log(err);
      throw err;
    }
      
  },

};