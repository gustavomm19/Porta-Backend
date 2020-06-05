const Admin = require('../../../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

module.exports = {
  admins: async (_, args, context) => {
    return Admin.find()
      .then((admins) => {
        return admins.map((admin) => {
          return { ...admin._doc };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  adminLogin: async (_, args, context) => {
    const admin = await Admin.findOne({ mail: args.mail });
    if (!admin) {
      throw new Error('Admin does not exist');
    }
    const isEqual = await bcrypt.compare(args.password, admin.password);
    if (!isEqual) {
      throw new Error('Wrong password');
    }
    const token = jwt.sign({ adminId: admin.id, mail: admin.mail }, 'somesupersecretkey', {
      expiresIn: '1h'
    });
    return { adminId: admin.id, token: token, tokenExpiration: 1 }
  }
};