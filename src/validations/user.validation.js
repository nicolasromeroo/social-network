
import Joi from "joi"

export const createUserSchema = Joi.object({
    username: Joi.string().required().min(3).max(20),
    email: Joi.string().required(),
    password: Joi.string().required(),
    avatar: Joi.string(),
    followers: Joi.number(),
    following: Joi.number(),
    posts: Joi.number(),
    role: Joi.string(),
    lastLogin: Joi.date()
})

