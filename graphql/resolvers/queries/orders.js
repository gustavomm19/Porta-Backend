const Order = require("../../../models/orders");
const Message = require("../../../models/messages");
const User = require('../../../models/users');


const messages = async (messagesIds) => {
  try {
    const mesagges = await Message.find({ _id: { $in: messagesIds } });
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
    } catch(err) {
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
          repartidor: repartidor.bind(this, order.repartidor),
          user: user.bind(this, order.user),
          messages: messages.bind(this, order._doc.messages),
        };
      });
    } catch(err) {
      throw err;
    }
};

const repartidor = async (repartidorId) => {
  try{
    const repartidor = await User.findById(repartidorId)
    if(repartidor){
      return {
        ...repartidor._doc,
        _id: repartidor.id,
        birthdate: new Date(repartidor._doc.birthdate).toISOString(),
        createdAt: new Date(repartidor._doc.createdAt).toISOString(),
        updatedAt: new Date(repartidor._doc.updatedAt).toISOString(),
        orders: orders.bind(this, repartidor._doc.orders),
      };
    }else{
      return null
    }
    
    } catch(err) {
      throw err;
    }
};

const user = async (userId) => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            _id: user.id,
            birthdate: new Date(user._doc.birthdate).toISOString(),
            createdAt: new Date(user._doc.createdAt).toISOString(),
            updatedAt: new Date(user._doc.updatedAt).toISOString(),
            orders: orders.bind(this, user._doc.orders),
        };
    } catch (err) {
        throw err;
    }
};

module.exports = {
  orders: async (_, args, context) => {
    // if (!context.token) throw new Error("No authorized");
    return Order.find({ status: "Waiting for a driver to accept" })
      .then((orders) => {
        return orders.map((order) => {
          return {
            ...order._doc,
            createdAt: new Date(order._doc.createdAt).toISOString(),
            updatedAt: new Date(order._doc.updatedAt).toISOString(),
            user: user.bind(this, order._doc.user),
            repartidor: repartidor.bind(this, order._doc.repartidor),
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  allOrders: async (_, args, context) => {
    // if (!context.token) throw new Error("No authorized");
    try {
      const orders = await Order.find()
      return orders.map((order) => {
        return {
          ...order._doc,
          createdAt: new Date(order._doc.createdAt).toISOString(),
          updatedAt: new Date(order._doc.updatedAt).toISOString(),
          user: user.bind(this, order._doc.user),
          repartidor: repartidor.bind(this, order._doc.repartidor),
        };
      });
    } catch (err) {
      throw err;
    }
  },
};