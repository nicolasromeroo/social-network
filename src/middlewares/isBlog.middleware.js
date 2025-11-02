import userDao from "../dao/user.dao.js"

// middleware para rol de usuario modo "blog" - TODO: diferentes opciones
export const isBlog = async (req, res, next) => {
    const { userId } = req.userId
    
    try {
        const user = await userDao.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }
        if (user.role !== "blog") {
            return res.status(403).json({ message: "La cuenta no está en modo blog" })
        }
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Error interno del servidor" })
    }
}