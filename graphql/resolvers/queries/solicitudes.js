const Solicitud = require("../../../models/solicitudes");

module.exports = {
  solicitudes: async (_, args, context) => {
    // if (!context.token) throw new Error("No authorized");
    return Solicitud.find({status: null}).populate('repartidor')
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
};
