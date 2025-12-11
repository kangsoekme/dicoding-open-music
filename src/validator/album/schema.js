const Joi = require('joi');

const AlbumPayloadSchema = Joi.object({
  // id: Joi.string().required(),
  name: Joi.string().required(),
  year: Joi.number().required(),
});

module.exports = AlbumPayloadSchema;
