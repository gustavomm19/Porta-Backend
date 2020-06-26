const User = require("../../../models/users");
const Rate = require("../../../models/rates");
const Comment = require("../../../models/comment");
const Order = require("../../../models/orders");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      };
    });
  } catch (err) {
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
  users: (_, args, context) => {
    return User.find()
      .then((users) => {
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
      })
      .catch((err) => {
        throw err;
      });
  },
  costumers: (_, args, context) => {
    return User.find({ role: "COSTUMER" })
      .then((users) => {
        return users.map((user) => {
          return {
            ...user._doc,
            password: null,
            birthdate: new Date(user._doc.birthdate).toISOString(),
            createdAt: new Date(user._doc.createdAt).toISOString(),
            updatedAt: new Date(user._doc.updatedAt).toISOString(),
            orders: orders.bind(this, user._doc.orders),
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  drivers: (_, args, context) => {
    return User.find({ role: "DRIVER" , workingStatus: true})
      .then((users) => {
        return users.map((user) => {
          return {
            ...user._doc,
            password: null,
            birthdate: new Date(user._doc.birthdate).toISOString(),
            createdAt: new Date(user._doc.createdAt).toISOString(),
            updatedAt: new Date(user._doc.updatedAt).toISOString(),
            rating: rates.bind(this, user._doc.rating),
            comments: comments.bind(this, user._doc.comments),
            orders: orders.bind(this, user._doc.orders),
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  newestUsers: (_, args, context) => {
    return User.find({ role: "COSTUMER" })
      .sort({ createdAt: -1 })
      .limit(2)
      .then((users) => {
        return users.map((user) => {
          return { ...user._doc, password: null, };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  newestDrivers: (_, args, context) => {
    return User.find({ role: "DRIVER" , workingStatus: true})
      .sort({ createdAt: -1 })
      .limit(2)
      .then((users) => {
        return users.map((user) => {
          return { ...user._doc, password: null, };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  userLogin: async (_, args, context) => {
    const user = await User.findOne({ mail: args.mail, role: args.role });
    if (!user) {
      throw new Error("User does not exist");
    }
    const isEqual = await bcrypt.compare(args.password, user.password);
    if (!isEqual) {
      throw new Error("Wrong password");
    }
    const token = jwt.sign(
      { userId: user.id, mail: user.mail },
      "somesupersecretkey",
      {
        expiresIn: "12h",
      }
    );
    const loggedUser = {
      ...user._doc,
      password: null,
      birthdate: new Date(user._doc.birthdate).toISOString(),
      createdAt: new Date(user._doc.createdAt).toISOString(),
      updatedAt: new Date(user._doc.updatedAt).toISOString(),
      rating: rates.bind(this, user._doc.rating),
      comments: comments.bind(this, user._doc.comments),
      orders: orders.bind(this, user._doc.orders),
  }
    return { user: loggedUser, token: token, tokenExpiration: 12 };
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

      };
    } catch (err) {
      throw err;
    }
  },
  selectedDriver: async (_, args, context) => {
    try {
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
};
