import commentDao from "../dao/comment.dao.js";
import { Filter } from "bad-words";

const filter = new Filter();

export const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await commentDao.getCommentByPost(postId);
    return res.status(200).json(comments)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: "Error interno del servidor.", err });
  }
};

export const comment = async (req, res) => {
  const user = req.user;
  const { pid } = req.params;  // cambio de postId a pid para que coincida con el parámetro de la ruta
  const { text } = req.body;

  console.log('User from token:', user);
  console.log('Post ID from params:', pid);
  console.log('Text from body:', text);

  try {
    const commentData = {
      userId: user._id,
      postId: pid,
      text: text
    };

    console.log('Datos a enviar al DAO:', commentData);
    
    const comment = await commentDao.create(commentData);

    console.log('Comentario creado:', comment);

    const cleanedComment = filter.clean(comment.text);

    comment.text = cleanedComment;

    res.status(200).json({ msg: "Comentario publicado con éxito.", comment });
  } catch (err) {
    return res.status(500).json({ msg: "Error interno del servidor.", err });
  }
  // createdAt
};

export const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const data = req.body;
  try {
    const comment = await commentDao.getById(commentId);
    if (!comment) {
      return res.status(404).json({ msg: "Comentario no encontrado." });
    }
    const now = new Date();
    const createdAt = new Date(comment.createdAt);
    const diffMs = now - createdAt;
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours > 12) {
      return res
        .status(403)
        .json({ msg: "No puedes editar el comentario después de 12 horas." });
    } else {
      const updatedComment = await commentDao.updateComment(commentId, data);
      return res.status(200).json(updatedComment);
    }
  } catch (err) {
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const deletedComment = await commentDao.deleteComment(commentId);

    res.status(200).json({ msg: "Comentario eliminado con éxito." });
  } catch (err) {
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};
