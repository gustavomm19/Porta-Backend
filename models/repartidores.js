const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const repartidorSchema = new Schema(
  {
    role: {
      type: String,
      default: "DRIVER",
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
      require: true,
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
      require: true,
    },
    cellphone: {
      type: String,
      require: true,
    },
    available: {
      type: Boolean,
      require: true,
    },
    workingStatus: {
      type: Boolean,
      require: true,
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
    rating: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rate",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Repartidores", repartidorSchema);
