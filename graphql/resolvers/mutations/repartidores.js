const Repartidor = require('../../../models/users');
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
                name : args.repartidorInput.name,
                lastName : args.repartidorInput.lastName,
                birthdate : args.repartidorInput.birthdate,
                mail : args.repartidorInput.mail,
                password : hashedPassword,
                zone : args.repartidorInput.zone,
                cellphone : args.repartidorInput.cellphone,
                status: args.repartidorInput.status,
                hiringDate: args.repartidorInput.hiringDate
            });
            return repartidor.save();
        }).then(result => {
            console.log(result);
            return { ...result._doc, password:null, _id: result.id };
        })
        .catch(err =>{
            throw err;
        })
        
    }

}
