import postDao from "../dao/post.dao.js";

export const myPosts = async (req, res) => {
  const userId = req.user._id;
  console.log('Token decodificado:', req.user);
  console.log('Buscando posts para userId:', userId);

  try {
    const myPosts = await postDao.getAllMyPosts(userId);
    console.log('Posts encontrados:', myPosts);
    return res.status(200).json(myPosts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Error al obtener posts: ", err });
  }
};

export const addNewPost = async (req, res) => {
  const userId = req.user._id;
  const { text, isPrivate } = req.body;

  if (!text)
    return res
      .status(400)
      .json({
        msj: "Para realizar un posteo al menos escriba una descripción o cargue una imagen.",
      });

  try {
    const post = await postDao.create({
      userId,
      text,
      isPrivate,
    });

    return res.status(200).json({ msg: "Post creado con éxito: ", post });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Error al crear post: ", err });
  }
};

export const like = async (req, res) => {
  const { pid: postId } = req.params;
  const { userId } = req.body;

  try {
    const post = await postDao.getById(postId);
    if (!post) return res.status(404).json({ msg: "Post no encontrado" });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // si existe quitar like
      post.likes = post.likes.filter((uid) => uid.toString() !== userId);
    } else {
      // agregar like
      post.likes.push(userId);
      post.likesCount += 1
    }

    await post.save();

    return res.status(200).json({
      msg: alreadyLiked ? "Like quitado" : "Like agregado",
      likes: post.likes.length,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "Error al procesar like", error: err.message });
  }
};
// obtener posts por usuario, pero sin logica de privacidad
// export const getByUser = async (req, res) => {
//   const userId = req.params;

//   try {
//     const posts = await postDao.getByUser({ userId });

//     return res.status(200).json({ msg: "Posts del usuario: ", posts });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ msg: "Error al crear post: ", err });
//   }
// };

// obtener posts por usuario, con logica de privados y publicos - isPrivate
// export const getPostById = async (req, res) => {
//   const { postId } = req.params;
//   const currentUserId = req.user.id;

//   try {
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ msg: "Error al obtener post privado. ", err });
//   }
// };
