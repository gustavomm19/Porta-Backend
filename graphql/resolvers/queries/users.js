const User = require("../../../models/users");
const Rate = require("../../../models/rates");
const Comment = require("../../../models/comment");
const Order = require("../../../models/orders");
const Message = require("../../../models/messages");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const rates = async (ratesIds) => {
  try{
  const rates = await Rate.find({ _id: { $in: ratesIds } })
      return rates.map((rate) => {
        return {
          ...rate._doc,
          _id: rate.id,
          createdAt: new Date(rate._doc.createdAt).toISOString(),
          updatedAt: new Date(rate._doc.updatedAt).toISOString(),
          repartidor: repartidor.bind(this, rate.repartidor),
          user: user.bind(this, rate.user),
        };
      });
    }catch(err) {
      throw err;
    }
};

const comments = async (commentsIds) => {
  try {
    const comments = await Comment.find({ _id: { $in: commentsIds } })
    return comments.map((comment) => {
      return {
        ...comment._doc,
        _id: comment.id,
        createdAt: new Date(comment._doc.createdAt).toISOString(),
        updatedAt: new Date(comment._doc.updatedAt).toISOString(),
        repartidor: repartidor.bind(this, comment.repartidor),
        user: user.bind(this, comment.user),
      };
    });
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
        repartidor: repartidor.bind(this, order.repartidor),
        user: user.bind(this, order.user),
        messages: messages.bind(this, order._doc.messages),
      };
    });
  } catch (err) {
    throw err;
  }
};

const order = async (orderId) => {
  try{
    const order = await Order.findById(orderId)
    if(order){
      return {
        ...order._doc,
        _id: order.id,
        createdAt: new Date(order._doc.createdAt).toISOString(),
        updatedAt: new Date(order._doc.updatedAt).toISOString(),
        repartidor: repartidor.bind(this, order.repartidor),
        user: user.bind(this, order.user),
        messages: messages.bind(this, order._doc.messages),
      };
    }else{
      return null
    }
    
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
        password: null,
        birthdate: new Date(repartidor._doc.birthdate).toISOString(),
        createdAt: new Date(repartidor._doc.createdAt).toISOString(),
        updatedAt: new Date(repartidor._doc.updatedAt).toISOString(),
        rating: rates.bind(this, repartidor._doc.rating),
        comments: comments.bind(this, repartidor._doc.comments),
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
          password: null,
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
  users: async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const users = await User.find()
      return users.map((user) => {
        return {
          ...user._doc,
          password: null,
          birthdate: new Date(user._doc.birthdate).toISOString(),
          createdAt: new Date(user._doc.createdAt).toISOString(),
          updatedAt: new Date(user._doc.updatedAt).toISOString(),
          rating: rates.bind(this, user._doc.rating),
          comments: comments.bind(this, user._doc.comments),
          orders: orders.bind(this, user._doc.orders)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  costumers: async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const costumers = await User.find({ role: "COSTUMER" })
      return costumers.map((user) => {
        return {
          ...user._doc,
          password: null,
          birthdate: new Date(user._doc.birthdate).toISOString(),
          createdAt: new Date(user._doc.createdAt).toISOString(),
          updatedAt: new Date(user._doc.updatedAt).toISOString(),
          orders: orders.bind(this, user._doc.orders),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  drivers: async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const drivers = await User.find({ role: "DRIVER" })
      return drivers.map((user) => {
        return {
          ...user._doc,
          password: null,
          birthdate: new Date(user._doc.birthdate).toISOString(),
          createdAt: new Date(user._doc.createdAt).toISOString(),
          updatedAt: new Date(user._doc.updatedAt).toISOString(),
          rating: rates.bind(this, user._doc.rating),
          comments: comments.bind(this, user._doc.comments),
          orders: orders.bind(this, user._doc.orders),
          currentOrder: order.bind(this, user._doc.currentOrder),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  newestUsers: async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const users = await User.find({ role: "COSTUMER" })
        .sort({ createdAt: -1 })
        .limit(2);
      return users.map((user) => {
        return { ...user._doc, password: null, };
      });
    } catch (err) {
      throw err;
    }
  },
  newestDrivers: async (_, args, context) => {
    try {
      const drivers = await User.find({ role: "DRIVER" })
        .sort({ createdAt: -1 })
        .limit(2)
      return drivers.map((user) => {
        return { ...user._doc, password: null, };
      });
    } catch (err) {
      throw err;
    }
  },
  currentUser: async (_, args, context) => {
    try {
      if (!context.token) {
        return null;
      }
      const user = await User.findById(context.token.userId);
      return {
        ...user._doc,
        password: null,
        birthdate: new Date(user._doc.birthdate).toISOString(),
        createdAt: new Date(user._doc.createdAt).toISOString(),
        updatedAt: new Date(user._doc.updatedAt).toISOString(),
        rating: rates.bind(this, user._doc.rating),
        comments: comments.bind(this, user._doc.comments),
        orders: orders.bind(this, user._doc.orders),
        currentOrder: order.bind(this, user._doc.currentOrder),
      };
    } catch (err) {
      throw err;
    }
  },
  selectedDriver: async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const driver = await User.findById(args.driverId);
      return {
        ...driver._doc,
        password: null,
        rating: rates.bind(this, driver._doc.rating),
        comments: comments.bind(this, driver._doc.comments),
      };
    } catch (err) {
      throw err;
    }
  },
  driversAroundMe: async (_, args, context) => {
    try{
      if (!context.token) {
        throw new Error("No authorized");
      }
      drivers = await User.find({ role: "DRIVER" , available: true, latitud: { $ne: null }, longitud: { $ne: null }})
        return drivers.map((driver) => {
          return {
            ...driver._doc,
            password: null,
            birthdate: new Date(driver._doc.birthdate).toISOString(),
            createdAt: new Date(driver._doc.createdAt).toISOString(),
            updatedAt: new Date(driver._doc.updatedAt).toISOString(),
            rating: rates.bind(this, driver._doc.rating),
            comments: comments.bind(this, driver._doc.comments),
            orders: orders.bind(this, driver._doc.orders),
          };
        });
      }catch(err) {
        throw err;
      }
  },
  getCurrentOrder: async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const theuser = await User.findById(context.token.userId);
      const currentOrder = await Order.findById(theuser.currentOrder);

      return {
        ...currentOrder._doc,
        _id: currentOrder.id,
        createdAt: new Date(currentOrder._doc.createdAt).toISOString(),
        updatedAt: new Date(currentOrder._doc.updatedAt).toISOString(),
        repartidor: repartidor.bind(this, currentOrder.repartidor),
        user: user.bind(this, currentOrder.user),
        messages: messages.bind(this, currentOrder._doc.messages),
      }
    } catch (err) {
      throw err;
    }
  },
};
