import mongoose, { Schema } from "mongoose";

const postsCollection = "posts";

const postSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  likesCount: {
    type: Number,
    default: 0,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  // TODO: manejo a través del modelo (no lo manejo como un array = [] ), y uso de virtual populate para popular en una url en particular.
  // comments: [
  //   {
  //     userId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "user",
  //       required: true,
  //     },
  //     text: {
  //       type: String,
  //       required: true,
  //       trim: true,
  //     },
  //     createdAt: {
  //       type: Date,
  //       default: Date.now,
  //     },
  //   },
  // ],
});

// aca uso un 'virtual populate' para obtener comentarios de la colección separada (coleccion de la coleccion)
postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
  options: { sort: { createdAt: -1 } },
});

// con esto me aseguro de que los virtuals se incluyan en formato JSON
postSchema.set("toJSON", { virtuals: true });
postSchema.set("toObject", { virtuals: true });

const Post = mongoose.model("Post", postSchema, postsCollection);

export default Post;
