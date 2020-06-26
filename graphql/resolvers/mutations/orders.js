const Order = require("../../../models/orders");
const User = require("../../../models/users");
const { pubsub } = require("../../puhsub");

const orders = async (ordersIds) => {
  try {
    const orders = await Order.find({ _id: { $in: ordersIds } });
    return orders.map((order) => {
        return {
          ...order._doc,
          _id: order.id,
          createdAt: new Date(order._doc.createdAt).toISOString(),
          updatedAt: new Date(order._doc.updatedAt).toISOString(),
          repartidor: repartidor.bind(this, order.repartidor),
          user: user.bind(this, order.user),
        };
      });
    } catch(err) {
      throw err;
    }
};

const repartidor = async (repartidorId) => {
  try{
    const repartidor = await User.findById(repartidorId)
      return {
        ...repartidor._doc,
        _id: repartidor.id,
        birthdate: new Date(repartidor._doc.birthdate).toISOString(),
        createdAt: new Date(repartidor._doc.createdAt).toISOString(),
        updatedAt: new Date(repartidor._doc.updatedAt).toISOString(),
        orders: orders.bind(this, repartidor._doc.orders),
      };
    } catch(err) {
      throw err;
    }
};

const user = async (userId) => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            _id: user.id,
            birthdate: new Date(user._doc.birthdate).toISOString(),
            createdAt: new Date(user._doc.createdAt).toISOString(),
            updatedAt: new Date(user._doc.updatedAt).toISOString(),
        };
    } catch (err) {
        throw err;
    }
};

module.exports = {
  createOrder: (_, args) => {
    const order = new Order({
      user: args.orderInput.user,
      repartidor: null,
      pickUp: args.orderInput.pickUp,
      deliver: args.orderInput.deliver,
      km: args.orderInput.km,
      price: args.orderInput.price,
      status: "Waiting for a driver to accept",
      succeeded: false,
    });
    let createdOrder;
    order
      .save()
      .then((result) => {
        createdOrder = { ...result._doc,
          _id: order.id,
          user: user.bind(this, args.orderInput.user),
        };
        return User.findById(args.orderInput.user);
      })
      .then((user) => {
        user.orders.push(order);
        return user.save();
      })
      .then((result) => {
        pubsub.publish("NOTIFICATION_ADDED", {
          notificationAdded: createdOrder,
        });
        return createdOrder;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
    return order;
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
        ...order._doc,
      };
    } catch (err) {
      throw err;
    }
  },
};
