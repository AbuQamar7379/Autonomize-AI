import Joi, { ObjectSchema } from "joi";

/**
 * Validation schema for searching users
 */
const searchUsers: ObjectSchema = Joi.object().keys({
  username: Joi.string(),
  location: Joi.string(),
  company: Joi.string(),
});

export { searchUsers };
