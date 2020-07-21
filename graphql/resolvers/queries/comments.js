const Comment = require("../../../models/comment");


module.exports = {
  comments: async (_, args, context) => {
    try {
      if (!context.token) {
        throw new Error("No authorized");
      }
      const comments = await Comment.find()
      return comments.map((comments) => {
        return {
          ...comments._doc,
          createdAt: new Date(comments._doc.createdAt).toISOString(),
          updatedAt: new Date(comments._doc.updatedAt).toISOString()
        };
      });
    } catch (err) {
      throw err;
    }
  }
};