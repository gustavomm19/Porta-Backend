const Solicitud = require("../../../models/solicitudes");

module.exports = {
  solicitudes: async (_, args, context) => {
    // if (!context.token) throw new Error("No authorized");

    return Solicitud.find()
      .then((solicitudes) => {
        return solicitudes.map((solicitud) => {
          return { ...solicitud._doc,
            createdAt: new Date(solicitud._doc.createdAt).toISOString(),
            updatedAt: new Date(solicitud._doc.updatedAt).toISOString()};
        });
      })
      .catch((err) => {
        throw err;
      });
  },
};
