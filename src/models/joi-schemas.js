import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const NationSpec = {
  title: Joi.string().trim().min(2).required(),
};

export const LoreSpec = {
  bookno: Joi.number().required(),
  charactersinv: Joi.string().required(),
  location: Joi.string().required(),
  lore: Joi.string().required(),
}