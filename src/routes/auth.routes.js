import { Router } from "express"
import authMiddleware from "../middlewares/auth.middleware.js"

import { login, profile, register } from "../controllers/auth.controller.js"

import { validateSchema } from "../middlewares/validateSchemas.middleware.js"
import { createUserSchema } from "../validations/user.validation.js"

const router = Router()

router.post("/register", validateSchema(createUserSchema), register)
router.post("/login", login)
router.get("/profile", authMiddleware, profile)

export default router