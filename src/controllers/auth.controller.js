import userDao from "../dao/user.dao.js";
import postDao from "../dao/post.dao.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log(req.body);
  try {
    const existingUser = await userDao.getByEmail(email);
    if (existingUser)
      return res.status(409).json({ msg: "Usuario existente, inicie sesión." });

    const hashedPassword = await hashPassword(password);

    const user = await userDao.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    console.log(user);
    return res
      .status(200)
      .json({ msg: "Usuario registrado con éxito. ", user });
  } catch (err) {
    return res.status(500).json({ msg: "Error al crear usuario: ", err });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userDao.getByEmail(email);
    if (!user) return res.status(403).json({ msg: "Email no registrado." });

    if (!password || !user.password) {
      return res
        .status(400)
        .json({ msg: "Faltan credenciales para iniciar sesión." });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(403).json({ msg: "Credenciales no válidas." });

    const token = generateToken({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    return res
      .status(200)
      .json({ msg: "Usuario logueado con éxito. ", user, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error al iniciar sesión: ", err });
  }
};

export const profile = async (req, res) => {
  const userId = req.user._id;
  console.log('Profile - User from token:', req.user);
  try {
    const user = await userDao.getById(userId);
    if (!user) return res.status(403).json({ msg: "Usuario no encontrado." });

    const posts = await postDao.getByUser(userId);

    posts.forEach((post, index) => {
      console.log(`Comentarios del post ${index}:`, post.comments);
    });

    return res.status(200).json({ msg: "Perfil de usuario: ", user, posts });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "Error al obtener perfil de usuario: ", err });
  }
};
