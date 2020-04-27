const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
  label: Joi.string().required(),
  urlImage: Joi.string(),
  quizId: Joi.number(),
  answers: Joi.array(),
})
