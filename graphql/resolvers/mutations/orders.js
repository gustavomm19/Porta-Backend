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
    if(repartidor){
      return {
        ...repartidor._doc,
        _id: repartidor.id,
        password: null,
        birthdate: new Date(repartidor._doc.birthdate).toISOString(),
        createdAt: new Date(repartidor._doc.createdAt).toISOString(),
        updatedAt: new Date(repartidor._doc.updatedAt).toISOString(),
        orders: orders.bind(this, repartidor._doc.orders),
      };
    }else{
      return null
    }
    
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
  createOrder: async (_, args) => {
    try {
      const order = new Order({
        user: args.orderInput.user,
        repartidor: null,
        pickUp: args.orderInput.pickUp,
        pickUpLat: args.orderInput.pickUpLat,
        pickUpLng: args.orderInput.pickUpLng,
        deliver: args.orderInput.deliver,
        deliverLat: args.orderInput.deliverLat,
        deliverLng: args.orderInput.deliverLng,
        km: args.orderInput.km,
        price: args.orderInput.price,
        status: "Waiting for a driver to accept",
        concluded: false,
      });

      let createdOrder;

      createdOrder = await order.save();

      createdOrder = {
        ...createdOrder._doc,
        user: user.bind(this, args.orderInput.user)
      }

      const theuser = await User.findById(args.orderInput.user);

      theuser.orders.push(order);
      theuser.currentOrder = order;
      await theuser.save();

      pubsub.publish("NOTIFICATION_ADDED", {
        notificationAdded: createdOrder,
      });
      return createdOrder;

    } catch (err) {
      console.log(err);
      throw err;
    }
      
  },
  acceptOrder: async (_, args) => {
    try {
      let acceptedOrder;
      const order = await Order.findById(args.orderId);
      order.repartidor = args.repartidor;
      // if(order.status == "Driver accepted"){
      //   throw new Error("Order already taken");
      // }
      order.status = "Picking up package";
      acceptedOrder = await order.save();

      const driver = await User.findById(args.repartidor);
      driver.orders.push(order);
      driver.currentOrder = order;
      await driver.save();

      acceptedOrder = {
        ...acceptedOrder._doc,
        user: user.bind(this, acceptedOrder._doc.user),
        repartidor: repartidor.bind(this, acceptedOrder._doc.repartidor),
      }

      pubsub.publish("ORDER_UPDATED", {
        orderUpdate: acceptedOrder,
        order: order
      });

      // pubsub.publish("NOTIFICATION_DELETED", {
      //   notificationDeleted: order,
      // });

      return acceptedOrder;
    } catch (err) {
      throw err;
    }
  },
  orderPickedUp: async (_, args) => {
    try {
      let orderPickedUp;
      const order = await Order.findById(args.orderId);
      order.status = "Package picked up!";
      orderPickedUp = await order.save();

      orderPickedUp = {
        ...orderPickedUp._doc,
        user: user.bind(this, orderPickedUp._doc.user),
        repartidor: repartidor.bind(this, orderPickedUp._doc.repartidor),
      }

      return orderPickedUp;
    } catch (err) {
      throw err;
    }
  },
  orderArrived: async (_, args) => {
    try {
      let orderArrived;
      const order = await Order.findById(args.orderId);
      order.status = "Your package arrived!";
      orderArrived = await order.save();

      orderArrived = {
        ...orderArrived._doc,
        user: user.bind(this, orderArrived._doc.user),
        repartidor: repartidor.bind(this, orderArrived._doc.repartidor),
      }

      return orderArrived;
    } catch (err) {
      throw err;
    }
  },
  orderDelivered: async (_, args) => {
    try {
      let orderDelivered;
      const order = await Order.findById(args.orderId);
      order.status = "Package delivered!";
      order.repartidor.currentOrder = null;
      order.concluded = true;
      orderDelivered = await order.save();

      orderDelivered = {
        ...orderDelivered._doc,
        user: user.bind(this, orderDelivered._doc.user),
        repartidor: repartidor.bind(this, orderDelivered._doc.repartidor),
      }

      return orderDelivered;
    } catch (err) {
      throw err;
    }
  },
};
