const Solicitud = require("../../../models/solicitudes");
const User = require("../../../models/users");
const Rate = require("../../../models/rates");
const Comment = require("../../../models/comment");
const Order = require("../../../models/orders");
const Message = require("../../../models/messages");

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
  solicitudes: async (_, args, context) => {
    // if (!context.token) throw new Error("No authorized");
    return Solicitud.find({ status: null }).populate('repartidor')
      .then((solicitudes) => {
        return solicitudes.map((solicitud) => {
          return {
            ...solicitud._doc,
            createdAt: new Date(solicitud._doc.createdAt).toISOString(),
            updatedAt: new Date(solicitud._doc.updatedAt).toISOString()
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  selectedRequest: async (_, args, context) => {
    try {
      const solicitud = await Solicitud.findById(args.solicitudId).populate('repartidor');
      return {
        ...solicitud._doc
      };
    } catch (err) {
      throw err;
    }
  },
  newestRequests: async (_, args, context) => {
    try {
      const solicitudes = await Solicitud.find({ status: null }).sort({ createdAt: -1 }).limit(2)
      return solicitudes.map((solicitud) => {
        return {
          ...solicitud._doc,
          createdAt: new Date(solicitud._doc.createdAt).toISOString(),
          updatedAt: new Date(solicitud._doc.updatedAt).toISOString(),
          repartidor: repartidor.bind(this, solicitud._doc.repartidor),
        };
      });
    } catch (err) {
      throw err;
    }
  }
};
