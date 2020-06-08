const Sesion = require("../../../models/sesion");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  sesions: (_, args, context) => {
    return Sesion.find()
      .then((sesions) => {
        return sesions.map((sesion) => {
          return { ...sesion._doc,
            createdAt: new Date(sesion._doc.createdAt).toISOString(),
            updatedAt: new Date(sesion._doc.updatedAt).toISOString()};
        });
      })
      .catch((err) => {
        throw err;
      });
  }
};