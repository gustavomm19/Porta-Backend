const Solicitud = require('../../../models/solicitudes');

module.exports = {
    createSolicitud: (_, args) => {

        const solicitud = new Solicitud({
            vehiculo : args.solicitudInput.vehiculo,
            licencia : args.solicitudInput.licencia,
            carnetCirculacion : args.solicitudInput.carnetCirculacion,
            seguroVehiculo : args.solicitudInput.seguroVehiculo
        });
        
        solicitud.save().then(result => {
            console.log(result);
            return { ...result._doc, _id: solicitud.id };
        }).catch(err => {
            console.log(err);
            throw err;
        });
        return solicitud
    }
}
