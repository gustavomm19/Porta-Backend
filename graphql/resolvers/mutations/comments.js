const Comment = require("../../../models/comment");
const User = require('../../../models/users');

module.exports = {
    createComment: async (_, args) => {
        const lookComment = await Comment.findOne({ user: args.user, repartidor: args.repartidor});
            if(lookComment){
                lookComment.content = args.content;
                lookComment.save().then(result => {
                    console.log(result);
                    return { ...result._doc, _id: lookComment.id };
                }).catch(err => {
                    console.log(err);
                    throw err;
                });
                return lookComment
            }
        const comment = new Comment({
            user: args.user,
            repartidor: args.repartidor,
            content: args.content
        });
        let createdComment;
        comment.save().then(result => {
            createdComment = { ...result._doc, _id: comment.id };
            return User.findById(args.repartidor);
        })
        .then(repartidor => {
            console.log(repartidor)
            repartidor.comments.push(comment);
            return repartidor.save();
        })
        .then(result => {
            return createdComment;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
        return comment
        
    }

}