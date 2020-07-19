const Comment = require("../../../models/comment");
const User = require('../../../models/users');

const user = async (userId) => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            _id: user.id,
            password: null,
            birthdate: new Date(user._doc.birthdate).toISOString(),
            createdAt: new Date(user._doc.createdAt).toISOString(),
            updatedAt: new Date(user._doc.updatedAt).toISOString(),
        };
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createComment: async (_, args) => {
        try {
            const comment = new Comment({
                user: args.user,
                repartidor: args.repartidor,
                content: args.content
            });
            let createdComment;
            const result = await comment.save()

            createdComment = { 
                ...result._doc,
                _id: result.id,
                user: user.bind(this, result._doc.user),
                createdAt: new Date(result._doc.createdAt).toISOString(),
                updatedAt: new Date(result._doc.updatedAt).toISOString(),
            };
            const repartidor = await User.findById(args.repartidor);
            console.log(repartidor)
            repartidor.comments.push(comment);
            await repartidor.save();
            return createdComment;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    updateComment: async (_, args) => {
        try {
            const comment = await Comment.findById(args.commentId);
            comment.content = args.content;
            comment.save();
            return {
                ...comment._doc
            };
        } catch (err) {
            throw err;
        }
    }

}