const Order = require("../../../models/orders");
const User = require('../../../models/users');

module.exports = {
    createOrder: (_, args) => {
        const order = new Order({
            user : args.orderInput.user,
            repartidor: null,
            pickUp : args.orderInput.pickUp,
            deliver : args.orderInput.deliver,
            km : args.orderInput.km,
            price: args.orderInput.price,
            status: "Waiting for a driver to accept",
            succeeded: false
        });
        let createdOrder
        order.save().then(result => {
            createdOrder = { ...result._doc, _id: order.id };
            return User.findById(args.orderInput.user);
        })
        .then(user => {
            user.orders.push(order);
            return user.save();
        })
        .then(result => {
            return createdOrder;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
        return order
    },
    acceptOrder: async (_, args) => {
        try {
            const order = await Order.findById(args.orderId);
            order.repartidor = args.repartidor;
            order.status = "Driver accepted";
            await order.save();
            const repartidor = await User.findById(args.repartidor);
            repartidor.orders.push(order);
            await repartidor.save();
            return {
              ...order._doc
            };
        } catch (err) {
            throw err;
        }     
    },
}