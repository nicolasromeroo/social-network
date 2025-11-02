
import Joi from "joi"

export const commentsValidations = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    postId: Joi.string().hex().length(24).required(),
    text: Joi.string().required().trim(),
    createdAt: Joi.date()
})