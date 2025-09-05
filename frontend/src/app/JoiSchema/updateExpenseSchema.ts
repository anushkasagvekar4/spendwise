import Joi from "joi";
export const joiUpdateSchema = Joi.object({
  amount: Joi.number().precision(2).min(0).optional().messages({
    "number.base": "Amount must be a number",
    "number.min": "The amount must be at least 0",
  }),
  description: Joi.string().min(3).max(100).optional().messages({
    "string.min": "Description must be at least 3 characters",
    "string.max": "Description can't exceed 100 characters",
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
    .optional()
    .messages({
      "array.min": "Select at least 1 tag",
      "any.required": "Category is required",
    }),
  time: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .optional(),
  date: Joi.date().optional(),
  // image: Joi.string()
  //   .pattern(/^data:image\/(png|jpg|jpeg);base64,[A-Za-z0-9+/=]+$/)
  //   // .allow(null)
  //   .optional(),
});
