const Solicitud = require('../../../models/solicitudes');
const User = require("../../../models/users");

module.exports = {
    createSolicitud: async (_, args, context) => {
        try {
            if (!context.token) {
                throw new Error("No authorized");
            }
            const solicitud = new Solicitud({
                vehiculo: args.solicitudInput.vehiculo,
                licencia: args.solicitudInput.licencia,
                carnetCirculacion: args.solicitudInput.carnetCirculacion,
                seguroVehiculo: args.solicitudInput.seguroVehiculo,
                repartidor: args.solicitudInput.repartidorID,
                experience: args.solicitudInput.experience,
                placaVehiculo: args.solicitudInput.placaVehiculo,
                status: null
            });

            const result = await solicitud.save()
            console.log(result);
            return { ...result._doc, _id: solicitud.id };
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    reviewSolicitud: async (_, args, context) => {
        try {
            if (!context.token) {
                throw new Error("No authorized");
            }
            const solicitud = await Solicitud.findById(args.reviewInput.id);
            let solResult;
            solicitud.status = args.reviewInput.status;
            const result = await solicitud.save()
            solResult = {
                ...result._doc,
                _id: result._doc.id
            }
            const driver = await User.findById(solicitud.repartidor);
            if (args.reviewInput.status) {
                driver.workingStatus = true;
                driver.experience = args.reviewInput.experience;
                driver.vehiculo = args.reviewInput.vehiculo;
                driver.placaVehiculo = args.reviewInput.placaVehiculo;
                driver.licencia = args.reviewInput.licencia;
                driver.carnetCirculacion = args.reviewInput.carnetCirculacion;
                driver.seguroVehiculo = args.reviewInput.seguroVehiculo;

                await driver.save();
            }

            return solResult;
        } catch (err) {
            throw err;
        }

    }
}
