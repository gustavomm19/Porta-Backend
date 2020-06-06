const Rate = require('../../../models/rates');


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

        rate.save().then(result => {
            console.log(result);
            return { ...result._doc, _id: rate.id };
        }).catch(err => {
            console.log(err);
            throw err;
        });
        return rate
        
    }

}