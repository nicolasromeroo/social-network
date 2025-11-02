
import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

import { addNewPost, like, myPosts } from "../controllers/post.controller.js";
import { comment, deleteComment, getComments, updateComment } from "../controllers/comment.controller.js";
// import { commentsRestrictions } from "../middlewares/commentsRestrictions.middleware.js";

const router = Router()

// lógica de MIS POST por ahora en /auth/profile
router.post("/addPost/:uid", authMiddleware, addNewPost) // publicar
router.get("/all", authMiddleware, myPosts) // mis posts | también se populan en /perfil

// likes
router.post("/likedPost/:pid", authMiddleware, like) 

// comentarios
router.get("/comment/:pid", authMiddleware, getComments)
router.post("/comment/:pid", authMiddleware, comment)
router.put("/updateComment/:id", authMiddleware, updateComment)
router.delete("/deleteComment/:id", authMiddleware, deleteComment)

export default router