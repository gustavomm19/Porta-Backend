const Comment = require("../../../models/comment");


module.exports = {
    comments: async (_, args, context) => {
    return Comment.find()
      .then((comments) => {
        return comments.map((comments) => {
          return { ...comments._doc,
            createdAt: new Date(comments._doc.createdAt).toISOString(),
            updatedAt: new Date(comments._doc.updatedAt).toISOString()};
        });
      })
      .catch((err) => {
        throw err;
      });
  }
};