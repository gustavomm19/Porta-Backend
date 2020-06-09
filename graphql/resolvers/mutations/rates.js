const Rate = require('../../../models/rates');
const User = require('../../../models/users');

module.exports = {
    createRate: async (_, args) => {
        const lookRate = await Rate.findOne({ user: args.user, repartidor: args.repartidor});
            if(lookRate){
                lookRate.score = args.score;
                lookRate.save().then(result => {
                    console.log(result);
                    return { ...result._doc, _id: lookRate.id };
                }).catch(err => {
                    console.log(err);
                    throw err;
                });
                return lookRate
            }
        const rate = new Rate({
            user: args.user,
            repartidor: args.repartidor,
            score: args.score
        });
        let createdRate;
        rate.save().then(result => {
            createdRate = { ...result._doc, _id: rate.id };
            return User.findById(args.repartidor);
        })
        .then(repartidor => {
            console.log(repartidor)
            repartidor.rating.push(rate);
            return repartidor.save();
        })
        .then(result => {
            return createdRate;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
        return rate
        
    }

}