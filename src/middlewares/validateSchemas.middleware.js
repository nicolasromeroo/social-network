export const validateSchema = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (err) {
      const errors = err.details.map((e) => e.message);
      return res.status(400).json({ msg: "Error de validación", errors });
    }
  };
};
   