// import { verifyToken } from "../utils/jwt.js";

import { verifyToken } from "../utils/jwt.js";

// const authMiddleware = (req, res, next) => {
//   // referencia a cabeceras
//   const authHeader = req.headers.authorization;
//   if (!authHeader.startsWith("Bearer "))
//     return res.status(401).json({ message: "Formato de token inválido" });
//   // referencia al token
//   const token = authHeader.split(" ")[1];
//   console.log(token);
//   if (!token) {
//     console.error(err);
//     res.status(401).json({ message: "Token inválido" });
//   }
//   const decoded = verifyToken(token);
//   if (!decoded?.userId) {
//     console.error(err)
//     res.status(401).json({ message: "Token inválido" });
// }

//   req.user = decoded;
//   next();
// };

// export default authMiddleware;

const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        console.error('Header Authorization no encontrado');
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader.startsWith('Bearer ')) {
        console.error('Formato de header inválido:', authHeader);
        return res.status(401).json({ message: 'Formato de token inválido' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.error('Token vacío');
        return res.status(401).json({ message: 'Token inválido' });
    }

    try {
        const decoded = verifyToken(token);

        req.user = decoded;
        return next();
    } catch (err) {
        console.error('Error en el middleware de autenticación:', err);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado' });
        }
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
}

export default authMiddleware