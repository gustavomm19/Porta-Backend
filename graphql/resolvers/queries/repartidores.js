const Repartidor = require('../../../models/repartidores');

module.exports = {
    repartidores: async (_, args, context) => {
        return Repartidor.find()
        .then(repartidores => {
            return repartidores.map(repartidor => {
                return {...repartidor._doc};
            });
        }).catch();
    }
  };