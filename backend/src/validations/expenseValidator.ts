import { Joi, Segments } from "celebrate";

export const addExpenseSchema = {
  [Segments.BODY]: Joi.object({
    amount: Joi.number().precision(2).min(0).required(),
    description: Joi.string().min(3).max(100).required(),
    category: Joi.array()
      .items(
        Joi.string().valid(
          "Bills",
          "Movie",
          "Grocery",
          "Shopping",
          "Medicine",
          "Food",
          "Other"
        )
      )
      .required(),
    time: Joi.string()
      .pattern(/^\d{2}:\d{2}$/)
      .required(),
    date: Joi.date().required(),
    image: Joi.string()
      .pattern(/^data:image\/(png|jpg|jpeg);base64,[A-Za-z0-9+/=]+$/)
      .allow(null)
      .optional(),
  }),
};

export const updateExpenseSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
  [Segments.BODY]: Joi.object({
    amount: Joi.number().precision(2).min(0).optional(),
    description: Joi.string().min(3).max(200).optional(),
    category: Joi.array()
      .items(
        Joi.string().valid(
          "Bills",
          "Movie",
          "Grocery",
          "Shopping",
          "Medicine",
          "Food",
          "Other"
        )
      )
      .optional(),
    time: Joi.string()
      .pattern(/^\d{2}:\d{2}$/)
      .optional(),
    date: Joi.date().optional(),
    image: Joi.string()
      .pattern(/^data:image\/(png|jpg|jpeg);base64,[A-Za-z0-9+/=]+$/)
      .allow(null)
      .optional(),
  }),
};

export const deleteExpenseSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const getExpenseByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};
