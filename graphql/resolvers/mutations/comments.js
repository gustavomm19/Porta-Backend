const Comment = require("../../../models/comment");
const User = require('../../../models/users');

module.exports = {
    createComment: async (_, args) => {
        
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