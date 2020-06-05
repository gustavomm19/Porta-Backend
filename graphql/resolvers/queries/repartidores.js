const Repartidor = require("../../../models/repartidores");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

module.exports = {
  repartidores: async (_, args, context) => {
    return Repartidor.find()
      .then((repartidores) => {
        return repartidores.map((repartidor) => {
          return { ...repartidor._doc };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  newestRepartidores: async (_, args, context) => {
    return Repartidor.find().sort({hiringDate:-1}).limit(2)
      .then((repartidores) => {
        return repartidores.map((repartidor) => {
          return { ...repartidor._doc };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  repartidorLogin: async (_, args, context) => {
    const repartidor = await Repartidor.findOne({ mail: args.mail });
    if (!repartidor) {
      throw new Error('Repartidor does not exist');
    }
    const isEqual = await bcrypt.compare(args.password, repartidor.password);
    if (!isEqual) {
      throw new Error('Wrong password');
    }
    const token = jwt.sign({ repartidorId: repartidor.id, mail: repartidor.mail }, 'somesupersecretkey', {
      expiresIn: '1h'
    });
    return { repartidorId: repartidor.id, token: token, tokenExpiration: 1 }
  }
};
