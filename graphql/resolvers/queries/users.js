const User = require("../../../models/users");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

module.exports = {
  users: async (_, args, context) => {
    return User.find()
      .then((users) => {
        return users.map((user) => {
          return { ...user._doc };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  userLogin: async (_, args, context) => {
    const user = await User.findOne({ mail: args.mail });
    if (!user) {
      throw new Error('User does not exist');
    }
    const isEqual = await bcrypt.compare(args.password, user.password);
    if (!isEqual) {
      throw new Error('Wrong password');
    }
    const token = jwt.sign({ userId: user.id, mail: user.mail }, 'somesupersecretkey', {
      expiresIn: '1h'
    });
    return { userId: user.id, token: token, tokenExpiration: 1 }
  }
};
