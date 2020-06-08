const Sesion = require('../../../models/sesion');
const User = require('../../../models/users');
const Repartidor = require('../../../models/repartidores');
const Admin = require('../../../models/admin');
const bcrypt = require('bcryptjs');



module.exports = {
    createSesion: (_, args) => {
        
        return Sesion.findOne({ mail: args.sesionInput.mail}).then(sesion => {
            if(sesion){
                throw new Error('User exists already');
            }
            return bcrypt.hash(args.sesionInput.password, 12);
        })
        .then(hashedPassword => {
            const sesion = new Sesion({
                mail : args.sesionInput.mail,
                password : hashedPassword,
                role : args.sesionInput.role
            });
            let createdSesion;
            return sesion.save();
        }).then(result => {
            createdSesion = { ...result._doc, _id: sesion.id };
            if(args.sesionInput.role === "user"){
                const user = new User({
                    name : args.sesionInput.name,
                    lastName : args.sesionInput.lastName,
                    birthdate : new Date(args.userInput.birthdate).toISOString(),
                    zone : args.sesionInput.zone,
                    cellphone : args.sesionInput.cellphone
                });
                return user.save().then(result => {
                    return createdSesion
                });
            }else if(args.sesionInput.role === "repartidor"){
                const repartidor = new Repartidor({
                    cedula: args.sesionInput.cedula,
                    name : args.sesionInput.name,
                    lastName : args.sesionInput.lastName,
                    birthdate : new Date(args.sesionInput.birthdate).toISOString(),
                    zone : args.sesionInput.zone,
                    cellphone : args.sesionInput.cellphone,
                    available: false,
                    workingStatus: false,
                    vehiculo: null,
                    licencia: null,
                    carnetCirculacion: null,
                    seguroVehiculo: null
                });
                return repartidor.save().then(result => {
                    return createdSesion
                });
            }else{
                const admin = new Admin({
                    name : args.sesionInput.name,
                });
                return admin.save().then(result => {
                    return createdSesion
                });
            }
        })
        .catch(err =>{
            throw err;
        })
        
    }

}