const User = require('../../../models/users');
const bcrypt = require('bcryptjs');


module.exports = {
    createUser: (_, args) => {
        
        return User.findOne({ mail: args.userInput.mail, role:args.userInput.role}).then(user => {
            if(user){
                throw new Error('User exists already');
            }
            return bcrypt.hash(args.userInput.password, 12);
        })
        .then(hashedPassword => {
            let user
            if(args.userInput.role === "COSTUMER"){
                 user = new User({
                    role: "COSTUMER",
                    name : args.userInput.name,
                    lastName : args.userInput.lastName,
                    birthdate : new Date(args.userInput.birthdate).toISOString(),
                    mail : args.userInput.mail,
                    password : hashedPassword,
                    zone : args.userInput.zone,
                    cellphone : args.userInput.cellphone
                });
            }else if(args.userInput.role === "DRIVER"){
                 user = new User({
                    role: "DRIVER",
                    cedula: args.userInput.cedula,
                    name : args.userInput.name,
                    lastName : args.userInput.lastName,
                    birthdate : new Date(args.userInput.birthdate).toISOString(),
                    mail : args.userInput.mail,
                    password : hashedPassword,
                    zone : args.userInput.zone,
                    cellphone : args.userInput.cellphone,
                    experience: "Not declared",
                    available: false,
                    workingStatus: false,
                    vehiculo: "Not declared",
                    licencia: "Not declared",
                    carnetCirculacion: "Not declared",
                    seguroVehiculo: "Not declared"
                });
            }else{
                 user = new User({
                    role: "ADMIN",
                    name : args.userInput.name,
                    lastName : args.userInput.lastName,
                    birthdate : new Date(args.userInput.birthdate).toISOString(),
                    mail : args.userInput.mail,
                    password : hashedPassword,
                    cellphone : args.userInput.cellphone
                });
            }    
            return user.save();
        }).then(result => {
            console.log(result);
            return { ...result._doc, password:null, _id: result.id };
        })
        .catch(err =>{
            throw err;
        })
        
    },
    updateUser: async (_, args) => {

        const user = await User.findById(args.updateInput.id);
        user.name = args.updateInput.name;
        user.lastName = args.updateInput.lastName;
        user.mail = args.updateInput.mail;
        user.birthdate = new Date(args.updateInput.birthdate).toISOString()
        user.zone = args.updateInput.zone;
        user.save().then(result => {
            console.log(result);
            return { ...result._doc, _id: user.id };
        }).catch(err => {
            console.log(err);
            throw err;
        });
        return user
    },
    changeAvailable: async (_, args) => {
        try {
            if (!context.token) {
                throw new Error("No authorized");
            }
            const user = await User.findById(context.token.userId);
            user.available = !user.available;
            return {
                ...user._doc,
                password: null,
            };
        } catch (err) {
            throw err;
        }
    }

}
