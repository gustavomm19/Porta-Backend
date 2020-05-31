const Admin = require('../../../models/admin');
const bcrypt = require('bcryptjs');


module.exports = {
    createAdmin: (_, args) => {
        
        return Admin.findOne({ mail: args.adminInput.mail}).then(admin => {
            if(admin){
                throw new Error('Admin exists already');
            }
            return bcrypt.hash(args.adminInput.password, 12);
        })
        .then(hashedPassword => {
            const admin = new Admin({
                mail : args.adminInput.mail,
                password : hashedPassword
            });
            return admin.save();
        }).then(result => {
            console.log(result);
            return { ...result._doc, password:null, _id: result.id };
        })
        .catch(err =>{
            throw err;
        })
        
    }

}