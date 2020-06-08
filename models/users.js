const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
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
    role: {
      type: String,
      require: true,
      default: "CUSTOMER",
    },
    cellphone: {
      type: String,
      require: true,
    },
    sesion: {
      type: Schema.Types.ObjectId,
      ref: "Sesion",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
