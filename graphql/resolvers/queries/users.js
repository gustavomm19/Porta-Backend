const User = require("../../../models/users");

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
};
