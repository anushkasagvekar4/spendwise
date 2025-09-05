import Joi from "joi";
export const joiSchema = Joi.object({
  amount: Joi.number().precision(2).min(0).required().messages({
    "number.base": "Amount must be a number",
    "number.min": "The amount must be at least 0",
    "any.required": "Amount is required",
  }),
  description: Joi.string().min(3).max(100).required().messages({
    "string.min": "Description must be at least 3 characters",
    "string.max": "Description can't exceed 100 characters",
    "any.required": "Description is required",
  }),
  category: Joi.array()
    .items(
      Joi.string()
        .valid(
          "Bills",
          "Movie",
          "Grocery",
          "Shopping",
          "Medicine",
          "Food",
          "Other"
        )
        .min(1)
    )
    .required()
    .messages({
      "array.min": "Select at least 1 tag",
      "any.required": "Category is required",
    }),
  time: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .required(),
  date: Joi.date().required(),
  image: Joi.any()
    .custom((value, helpers) => {
      if (!value) return value; // optional
      const file = value instanceof File ? value : value[0];
      if (!file) return value; // no file selected

      const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
      if (!allowedTypes.includes(file.type)) {
        // Correct way to use helpers.message
        return helpers.message({ custom: "Image must be png, jpg, or jpeg" });
      }

      return value;
    })
    .optional(),
});
