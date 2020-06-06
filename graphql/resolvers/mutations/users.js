const User = require('../../../models/users');
const bcrypt = require('bcryptjs');


module.exports = {
    createUser: (_, args) => {
        
        return User.findOne({ mail: args.userInput.mail}).then(user => {
            if(user){
                throw new Error('User exists already');
            }
            return bcrypt.hash(args.userInput.password, 12);
        })
        .then(hashedPassword => {
            const user = new User({
                name : args.userInput.name,
                lastName : args.userInput.lastName,
                birthdate : new Date(args.userInput.birthdate).toISOString(),
                mail : args.userInput.mail,
                password : hashedPassword,
                zone : args.userInput.zone,
                cellphone : args.userInput.cellphone
            });
            return user.save();
        }).then(result => {
            console.log(result);
            return { ...result._doc, password:null, _id: result.id };
        })
        .catch(err =>{
            throw err;
        })
        
    }

}
