import Comment from "../models/comment.model.js";
import Post from "../models/posts.model.js";

class PostDao {
  async create(data) {
    const post = await Post.create(data);
    return post;
  }
  async getAllMyPosts(userId) {
    // esto obtiene los posts y popula los datos del usuario
    const posts = await Post.find({ userId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    // Obtener y popular los comentarios para cada post
    for (const post of posts) {
      const comments = await Comment.find({ postId: post._id })
        .populate("userId", "username")
        .sort({ createdAt: -1 });
      
      post.comments = comments;
      // Agregar el conteo de likes
      post.likesCount = post.likes ? post.likes.length : 0;
    }

    return posts;
  }

  async getById(postId) {
    const post = await Post.findById(postId);
    return post;
  }

 async getByUser(userId) {
  // Primero obtener los posts
  const posts = await Post.find({ userId: userId })
    .populate("userId", "username");

  // Logging para diagnóstico
  console.log("Posts antes de populate comments:", posts);

  // Obtener comentarios manualmente para verificar
  for (const post of posts) {
    const comments = await Comment.find({ postId: post._id })
      .populate("userId", "username")
      .sort({ createdAt: -1 });
    
    console.log(`Comentarios encontrados para post ${post._id}:`, comments);
    post.comments = comments;
  }

  return posts;
}

  // async likedPost()

  async update(id) {
    const post = await Post.findByIdAndUpdate(id, { new: true });
    return post;
  }

  async delete(id) {
    const post = await Post.findByIdAndDelete(id);
    return post;
  }
}

const postDao = new PostDao();

export default postDao;
