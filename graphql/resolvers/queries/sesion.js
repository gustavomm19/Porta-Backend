const Sesion = require("../../../models/sesion");
const User = require("../../../models/users");
const Repartidor = require("../../../models/repartidores");
const Admin = require("../../../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  sesions: (_, args, context) => {
    return Sesion.find()
      .then((sesions) => {
        return sesions.map((sesion) => {
          return { ...sesion._doc,
            password:null,
            createdAt: new Date(sesion._doc.createdAt).toISOString(),
            updatedAt: new Date(sesion._doc.updatedAt).toISOString()};
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  sesionLogin: async (_, args, context) => {
    const sesion = await Sesion.findOne({ mail: args.mail });
    if (!sesion) {
      throw new Error("User does not exist");
    }
    const isEqual = await bcrypt.compare(args.password, sesion.password);
    if (!isEqual) {
      throw new Error("Wrong password");
    }
    const token = jwt.sign(
      { sesionId: sesion.id, mail: sesion.mail },
      "somesupersecretkey",
      {
        expiresIn: "1h",
      }
    );
    return { sesionId: sesion.id, token: token, tokenExpiration: 1 };
  },
  currentSesion: async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const sesion = await Sesion.findById(context.token.sesionId);
      return {
        ...sesion._doc,
        password: null,
      };
    } catch (err) {
      throw err;
    }
  },
  currentSesionUser: async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const user = await User.findOne({sesion:context.token.sesionId}).populate('sesion');
      // user.populate('Sesion');
      return {
        ...user._doc,
        password: null,
        sesion: user._doc.sesion
      };
    } catch (err) {
      throw err;
    }
  }

};