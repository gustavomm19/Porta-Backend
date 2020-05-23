const Repartidor = require('../../../models/repartidores');

module.exports = {
    createRepartidor: (_, args) => {

        const repartidor = new Repartidor({
            name : args.repartidorInput.name,
            lastName : args.repartidorInput.lastName,
            birthdate : args.repartidorInput.birthdate,
            mail : args.repartidorInput.mail,
            password : args.repartidorInput.password,
            zone : args.repartidorInput.zone,
            cellphone : args.repartidorInput.cellphone,
            status: args.repartidorInput.status,
            hiringDate: args.repartidorInput.hiringDate
        });
        
        repartidor.save().then(result => {
            console.log(result);
            return { ...result._doc, _id: repartidor.id };
        }).catch(err => {
            console.log(err);
            throw err;
        });
        return repartidor
    }
}
