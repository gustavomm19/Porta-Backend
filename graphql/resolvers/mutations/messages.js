const Message = require("../../../models/messages");
const Conversation = require("../../../models/conversations");
const User = require("../../../models/users");
const Order = require("../../../models/orders");
const { pubsub } = require("../../puhsub");

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
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

const orders = async (ordersIds) => {
  try {
    const orders = await Order.find({ _id: { $in: ordersIds } });
    return orders.map((order) => {
      return {
        ...order._doc,
        _id: order.id,
        createdAt: new Date(order._doc.createdAt).toISOString(),
        updatedAt: new Date(order._doc.updatedAt).toISOString(),
        repartidor: user.bind(this, order.repartidor),
        user: user.bind(this, order.user),
        messages: messages.bind(this, order._doc.messages),
      };
    });
  } catch (err) {
    throw err;
  }
};

const messages = async (messagesIds) => {
  try {
    const mesagges = await Message.find({ _id: { $in: ordersIds } });
    return mesagges.map((message) => {
      return {
        ...message._doc,
        _id: message.id,
        createdAt: new Date(message._doc.createdAt).toISOString(),
        updatedAt: new Date(message._doc.updatedAt).toISOString(),
        sender: user.bind(this, message.sender),
        receiver: user.bind(this, message.receiver),
      };
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createMessage: async (_, args) => {
    try {
      let order;
      let theMessage;
      const message = new Message({
        sender: args.messageInput.sender,
        receiver: args.messageInput.receiver,
        content: args.messageInput.content,
        order: args.messageInput.order,
      });
      theMessage = await message.save();
      order = await Order.findById(args.messageInput.order);
      order.messages.push(message);

      await order.save();

      theMessage = {
        ...theMessage._doc,
        createdAt: new Date(theMessage._doc.createdAt).toISOString(),
        updatedAt: new Date(theMessage._doc.updatedAt).toISOString(),
        sender: user.bind(this, theMessage.sender),
        receiver: user.bind(this, theMessage.receiver),
      };

      pubsub.publish("NEW_MESSAGE", {
        newMessage: theMessage,
      });

      return theMessage;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
