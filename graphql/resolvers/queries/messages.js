const Message = require("../../../models/messages");
const Order = require("../../../models/orders");
const User = require("../../../models/users");

const messages = async (messagesIds) => {
  try {
    const mesagges = await Message.find({ _id: { $in: messagesIds } }).sort({
      _id: -1,
    });
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

const order = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (order) {
      return {
        ...order._doc,
        _id: order.id,
        createdAt: new Date(order._doc.createdAt).toISOString(),
        updatedAt: new Date(order._doc.updatedAt).toISOString(),
        repartidor: repartidor.bind(this, order.repartidor),
        user: user.bind(this, order.user),
        messages: messages.bind(this, order._doc.messages),
      };
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

const repartidor = async (repartidorId) => {
  try {
    const repartidor = await User.findById(repartidorId);
    if (repartidor) {
      return {
        ...repartidor._doc,
        _id: repartidor.id,
        birthdate: new Date(repartidor._doc.birthdate).toISOString(),
        createdAt: new Date(repartidor._doc.createdAt).toISOString(),
        updatedAt: new Date(repartidor._doc.updatedAt).toISOString(),
      };
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      birthdate: new Date(user._doc.birthdate).toISOString(),
      createdAt: new Date(user._doc.createdAt).toISOString(),
      updatedAt: new Date(user._doc.updatedAt).toISOString(),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  messages: async (_, args, context) => {
    // if (!context.token) throw new Error("No authorized");
    try {
      //const messages = await Message.find({ $or:[ {'receiver':args.user}, {'sender':args.user},  ]});
      const theMessages = await Message.find({ order: args.order }).sort({
        _id: -1,
      });
      //const messages = await Message.find({'receiver':args.user});
      return theMessages.map((message) => {
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
  },
};
