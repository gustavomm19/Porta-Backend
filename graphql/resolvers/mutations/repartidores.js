const Repartidor = require('../../../models/repartidores');
const bcrypt = require('bcryptjs');


module.exports = {
    createRepartidor: (_, args) => {
        
        return Repartidor.findOne({ mail: args.repartidorInput.mail}).then(repartidor => {
            if(repartidor){
                throw new Error('Repartidor exists already');
            }
            return bcrypt.hash(args.repartidorInput.password, 12);
        })
        .then(hashedPassword => {
            const repartidor = new Repartidor({
                cedula: args.repartidorInput.cedula,
                name : args.repartidorInput.name,
                lastName : args.repartidorInput.lastName,
                birthdate : new Date(args.repartidorInput.birthdate).toISOString(),
                mail : args.repartidorInput.mail,
                password : hashedPassword,
                zone : args.repartidorInput.zone,
                cellphone : args.repartidorInput.cellphone,
                available: false,
                workingStatus: false,
                vehiculo: null,
                licencia: null,
                carnetCirculacion: null,
                seguroVehiculo: null
            });
            return repartidor.save();
        }).then(result => {
            console.log(result);
            return { ...result._doc, password:null, _id: result.id };
        })
        .catch(err =>{
            throw err;
        })
        
    },
    updateRepartidor: async (_, args) => {

        const repartidor = await repartidor.findById(args.updateInput.id);
        repartidor.name = args.updateInput.name;
        repartidor.lastName = args.updateInput.lastName;
        repartidor.birthdate = new Date(args.updateInput.birthdate).toISOString()
        repartidor.zone = args.updateInput.zone;
        repartidor.save().then(result => {
            console.log(result);
            return { ...result._doc, _id: repartidor.id };
        }).catch(err => {
            console.log(err);
            throw err;
        });
        return repartidor
    },

}
