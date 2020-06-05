const Solicitud = require("../../../models/solicitudes");

module.exports = {
  solicitudes: async (_, args, context) => {
    // if (!context.token) throw new Error("No authorized");

    return Solicitud.find()
      .then((solicitudes) => {
        return solicitudes.map((solicitud) => {
          return { ...solicitud._doc };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
};
