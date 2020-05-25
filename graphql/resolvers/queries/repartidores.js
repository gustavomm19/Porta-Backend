const Repartidor = require("../../../models/repartidores");

module.exports = {
  repartidores: async (_, args, context) => {
    // if (!context.token) throw new Error("No authorized");

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
};
