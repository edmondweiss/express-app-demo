const Joi = require('joi');

module.exports.course = {
  id: Joi.number(),
  name: Joi.string().min(3).max(60).required()
}