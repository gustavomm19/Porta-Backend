const User = require('../../../models/users');
const Rate = require("../../../models/rates");
const Comment = require("../../../models/comment");
const Order = require("../../../models/orders");
const Message = require("../../../models/messages");
const { contactanos } = require("../../../services/EmailService");
const secretKey = require("../../../crypto/crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pubsub } = require("../../puhsub");
const { stripe } = require("../../../stripe/stripe");

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
  } catch (err) {
    throw err;
  }
};

const rates = async (ratesIds) => {
  try {
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
  } catch (err) {
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

const order = async (orderId) => {
  try {
    const order = await Order.findById(orderId)
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
      return null
    }

  } catch (err) {
    throw err;
  }
};

const repartidor = async (repartidorId) => {
  try {
    const repartidor = await User.findById(repartidorId)
    if (repartidor) {
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
    } else {
      return null
    }
  } catch (err) {
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
  createUser: async (_, args) => {
    try {
      const findUser = await User.findOne({ mail: args.userInput.mail, role: args.userInput.role })
      if (findUser) {
        throw new Error('User exists already');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      let user
      let result
      if (args.userInput.role === "COSTUMER") {
        user = new User({
          role: "COSTUMER",
          name: args.userInput.name,
          lastName: args.userInput.lastName,
          birthdate: new Date(args.userInput.birthdate).toISOString(),
          mail: args.userInput.mail,
          password: hashedPassword,
          zone: args.userInput.zone,
          cellphone: args.userInput.cellphone,
          haveCard: false,
        });

        result = await user.save();

        const customer = await stripe.customers.create({
          email: result.mail
        });

        // const intent =  await stripe.setupIntents.create({
        //   customer: customer.id,
        // });

        result.stripeId = customer.id;
        result = await result.save();

      } else if (args.userInput.role === "DRIVER") {
        user = new User({
          role: "DRIVER",
          cedula: args.userInput.cedula,
          name: args.userInput.name,
          lastName: args.userInput.lastName,
          birthdate: new Date(args.userInput.birthdate).toISOString(),
          mail: args.userInput.mail,
          password: hashedPassword,
          zone: args.userInput.zone,
          cellphone: args.userInput.cellphone,
          experience: "Not declared",
          available: false,
          workingStatus: false,
          vehiculo: "Not declared",
          licencia: "Not declared",
          carnetCirculacion: "Not declared",
          seguroVehiculo: "Not declared",
          placaVehiculo: "Not declared"
        });
        result = await user.save();
      } else {
        user = new User({
          role: "ADMIN",
          name: args.userInput.name,
          lastName: args.userInput.lastName,
          birthdate: new Date(args.userInput.birthdate).toISOString(),
          mail: args.userInput.mail,
          password: hashedPassword,
          cellphone: args.userInput.cellphone
        });
        result = await user.save();
      }

      console.log(result);
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }

  },
  updateUser: async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const user = await User.findById(args.updateInput.id);
      user.name = args.updateInput.name;
      user.lastName = args.updateInput.lastName;
      user.birthdate = new Date(args.updateInput.birthdate).toISOString()
      user.zone = args.updateInput.zone;
      user.cedula = args.updateInput.cedula;
      const result = await user.save()
      console.log(result);
      return { ...result._doc, _id: user.id };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  changeAvailable: async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const driver = await User.findById(context.token.userId);
      driver.available = !driver.available;
      // if(user.available){
      //   user.latitud = args.lat;
      //   user.longitud = args.lng;
      // }
      await driver.save();
      if (driver.latitud != null) {
        pubsub.publish("DRIVER_ADDED", {
          addDriver: driver,
        });
      }
      return {
        ...driver._doc,
        password: null,
      };
    } catch (err) {
      throw err;
    }
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
      secretKey,
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
      currentOrder: order.bind(this, user._doc.currentOrder),
    }
    return { user: loggedUser, token: token, tokenExpiration: 12 };
  },
  updateLocationDriver: async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const user = await User.findById(context.token.userId);
      user.latitud = args.lat;
      user.longitud = args.lng;
      await user.save();
      return {
        ...user._doc,
        password: null,
      };
    } catch (err) {
      throw err;
    }
  },
  contactUs: async (_, args, context) =>{
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const name = args.contactInput.name + " " + args.contactInput.lastName
      const message = {
        name: name,
        from: args.contactInput.from,
        subject:args.contactInput.subject,
        text:args.contactInput.text,
        role: args.contactInput.role
      };

      const sended = contactanos(_,message);
      return sended;
    } catch (err) {
      throw err;
    }
  },
  setUpCreditCard: async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const theUser = await User.findById(args.cardInput.userId);
      
      const costumer = await stripe.customers.create({
        email: theUser.mail
      });

      theUser.stripeId = costumer.id;
      await theUser.save();

      await stripe.paymentMethods.create({
        type: 'card',
        customer: costumer.id,
        card: {
          number: args.cardInput.number,
          exp_month: args.cardInput.exp_month,
          exp_year: args.cardInput.exp_year,
          cvc: args.cardInput.cvc,
        },
      });

      return theUser
    } catch (err) {
      throw err;
    }
  },
  updateRepartidor: async (_, args) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const repartidor = await User.findById(args.updateInput.id);
      repartidor.name = args.updateInput.name;
      repartidor.lastName = args.updateInput.lastName;
      repartidor.birthdate = new Date(args.updateInput.birthdate).toISOString()
      repartidor.zone = args.updateInput.zone;
      const result = await repartidor.save()
      console.log(result);
      return { ...result._doc, _id: user.id };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  setUpIntent: async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const theUser = await User.findById(context.token.userId);
      
      const intent =  await stripe.setupIntents.create({
        customer: theUser.stripeId,
      });

      const secret = intent.client_secret;

      //return { client_secret: intent.client_secret }
      return secret;
    } catch (err) {
      throw err;
    }
  },
  cardSaved: async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const theUser = await User.findById(context.token.userId);
      
      theUser.haveCard = true;
      const save = await theUser.save();

      return save;
    } catch (err) {
      throw err;
    }
  },
  collectPay: async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const driver = await User.findById(context.token.userId);
      
      driver.saldo = 0;
      const save = await driver.save();

      return save;
    } catch (err) {
      throw err;
    }
  },
  updateProfilePic:async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const theUser = await User.findById(context.token.userId);
      
      theUser.userImageURL = args.imageURL;
      
      const save = await theUser.save();

      return save;
    } catch (err) {
      throw err;
    }
  },


}
