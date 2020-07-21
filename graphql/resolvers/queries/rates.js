const Rate = require("../../../models/rates");


module.exports = {
  rates: async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const rates = await Rate.find()
      return rates.map((rates) => {
        return {
          ...rates._doc,
          createdAt: new Date(rates._doc.createdAt).toISOString(),
          updatedAt: new Date(rates._doc.updatedAt).toISOString()
        };
      });
    } catch (err) {
      throw err;
    }
  }
};