const Rate = require('../../../models/rates');
const User = require('../../../models/users');

const user = async (userId) => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            _id: user.id,
            password: null,
            birthdate: new Date(user._doc.birthdate).toISOString(),
            createdAt: new Date(user._doc.createdAt).toISOString(),
            updatedAt: new Date(user._doc.updatedAt).toISOString(),
        };
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createRate: async (_, args) => {
        try {
            const lookRate = await Rate.findOne({ user: args.user, repartidor: args.repartidor });
            if (lookRate) {
                lookRate.score = args.score;
                const updateRate = await lookRate.save()
                console.log(updateRate);
                return { 
                    ...updateRate._doc, 
                    user: user.bind(this, updateRate._doc.user),
                };
            }

            const rate = new Rate({
                user: args.user,
                repartidor: args.repartidor,
                score: args.score
            });

            let createdRate;
            const result = await rate.save()
            createdRate = { 
                ...result._doc, 
                user: user.bind(this, result._doc.user),
            };

            const repartidor = await User.findById(args.repartidor);
            console.log(repartidor)
            repartidor.rating.push(rate);
            await repartidor.save();

            return createdRate;
        } catch (err) {
            console.log(err);
            throw err;
        }

    }

}