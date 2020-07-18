const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    role: {
      type: String,
      require: true,
    },
    mail: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    cedula: {
      type: String,
      require: false,
    },
    name: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    birthdate: {
      type: Date,
      require: true,
    },
    zone: {
      type: String,
      require: false,
    },
    cellphone: {
      type: String,
      require: true,
    },
    currentOrder: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      default:null
    },
    latitud: {
      type: String,
      require: false,
      default:null
    },
    longitud: {
      type: String,
      require: false,
      default:null
    },
    available: {
      type: Boolean,
      require: false,
    },
    workingStatus: {
      type: Boolean,
      require: false,
    },
    experience: {
      type: String,
      require: false,
    },
    vehiculo: {
      type: String,
      require: false,
    },
    licencia: {
      type: String,
      require: false,
    },
    carnetCirculacion: {
      type: String,
      require: false,
    },
    seguroVehiculo: {
      type: String,
      require: false,
    },
    placaVehiculo: {
      type: String,
      require: false,
    },
    rating: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rate",
      },
    ],
    comments: [
        {
          type: Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
    orders: [
        {
          type: Schema.Types.ObjectId,
          ref: "Order",
        },
      ],
    //URL de la imagen en Cloudinary
    userImageURL: {
      type: String,
      require: false,
      default: null
    },
    //public_id de Cloudinary
    userImageId: {
      type: String,
      require: false,
      default: null
    },
    stripeId: {
      type: String,
      require: false,
      default: null,
    },
    haveCard: {
      type: Boolean,
      require: false,
    },
    saldo: {
      type: Number,
      require: false,
      default: 0
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
