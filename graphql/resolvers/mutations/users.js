const User = require('../../../models/users');

module.exports = {
    createUser: (_, args) => {

        const user = new User({
            name : args.userInput.name,
            lastName : args.userInput.lastName
        });
        
        user.save().then(result => {
            console.log(result);
            return { ...result._doc, _id: user.id };
        }).catch(err => {
            console.log(err);
            throw err;
        });
        return user
    }
}


// createUser: (args) => {

//     const user = new User({
//         name : args.userInput.name,
//         lastName : args.userInput.lastName
//     });
    
//     user.save().then(result => {
//         console.log(result);
//         return { ...result._doc, _id: user.id };
//     }).catch(err => {
//         console.log(err);
//         throw err;
//     });
//     return user
// }

// module.exports = createUser;