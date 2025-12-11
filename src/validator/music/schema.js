const Joi = require('joi');

const MusicPayloadSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  year: Joi.number().required(),
  title: Joi.string().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number(),
  albumId: Joi.string(),
});

module.exports = MusicPayloadSchema;
