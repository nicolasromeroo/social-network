import Comment from "../models/comment.model.js";

class CommentDao {
  async create(data) {
    const comment = await Comment.create(data);
    return comment;
  }

  // GET comentarios
  async getCommentById({ _id }) {
    const comment = await Comment.findById(_id);
    return comment;
  }

  async getCommentByPost(postId) {
    const comment = await Comment.find({ postId: postId })
      // .populate("user", "username")
      .sort({ createdAt: -1 });
    return comment;
  }

  async getCommentsByUser(userId) {
    const comments = await Comment.find({ user: userId })
      .populate("post")
      .sort({ createdAt: -1 });
    return comments;
  }

  async updateComment(commentId, data) {
    const comment = await Comment.findByIdAndUpdate(commentId, data, {
      new: true,
    });
    return comment;
  }
  async deleteComment(cid) {
    const comment = await Comment.findByIdAndDelete(cid);
    return comment;
  }
}

const commentDao = new CommentDao();
export default commentDao;
