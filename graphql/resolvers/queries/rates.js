const Rate = require("../../../models/rates");


module.exports = {
    rates: async (_, args, context) => {
    return Rate.find()
      .then((rates) => {
        return rates.map((rates) => {
          return { ...rates._doc,
            createdAt: new Date(rates._doc.createdAt).toISOString(),
            updatedAt: new Date(rates._doc.updatedAt).toISOString()};
        });
      })
      .catch((err) => {
        throw err;
      });
  }
};