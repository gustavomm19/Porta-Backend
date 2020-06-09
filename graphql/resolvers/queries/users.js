const User = require("../../../models/users");
const Rate = require("../../../models/rates");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const rates = (ratesIds) => {
  return Rate.find({ _id: { $in: ratesIds } })
    .then((rates) => {
      return rates.map((rate) => {
        return {
          ...rate._doc,
          _id: rate.id,
          createdAt: new Date(rate._doc.createdAt).toISOString(),
          updatedAt: new Date(rate._doc.updatedAt).toISOString(),
          repartidor: repartidor.bind(this, rate.repartidor),
        };
      });
    })
    .catch((err) => {
      throw err;
    });
};

const repartidor = (repartidorId) => {
  return User.findById(repartidorId)
    .then((repartidor) => {
      return {
        ...repartidor._doc,
        _id: repartidor.id,
        birthdate: new Date(repartidor._doc.birthdate).toISOString(),
        createdAt: new Date(repartidor._doc.createdAt).toISOString(),
        updatedAt: new Date(repartidor._doc.updatedAt).toISOString(),
        rating: rates.bind(this, repartidor._doc.rating),
      };
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  users: (_, args, context) => {
    return User.find()
      .then((users) => {
        return users.map((user) => {
          return {
            ...user._doc,
            birthdate: new Date(user._doc.birthdate).toISOString(),
            createdAt: new Date(user._doc.createdAt).toISOString(),
            updatedAt: new Date(user._doc.updatedAt).toISOString(),
            rating: rates.bind(this, user._doc.rating),
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
            birthdate: new Date(user._doc.birthdate).toISOString(),
            createdAt: new Date(user._doc.createdAt).toISOString(),
            updatedAt: new Date(user._doc.updatedAt).toISOString(),
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  drivers: (_, args, context) => {
    return User.find({ role: "DRIVER" })
      .then((users) => {
        return users.map((user) => {
          return {
            ...user._doc,
            birthdate: new Date(user._doc.birthdate).toISOString(),
            createdAt: new Date(user._doc.createdAt).toISOString(),
            updatedAt: new Date(user._doc.updatedAt).toISOString(),
            rating: rates.bind(this, user._doc.rating),
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
          return { ...user._doc };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  newestDrivers: (_, args, context) => {
    return User.find({ role: "DRIVER" })
      .sort({ createdAt: -1 })
      .limit(2)
      .then((users) => {
        return users.map((user) => {
          return { ...user._doc };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  userLogin: async (_, args, context) => {
    const user = await User.findOne({ mail: args.mail });
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
        expiresIn: "1h",
      }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  },

  currentUser: async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const user = await User.findById(context.token.userId);
      return {
        ...user._doc,
        password: null,
      };
    } catch (err) {
      throw err;
    }
  },
};
