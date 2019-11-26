const Joi = require("joi")
const Schema = require("mongoose").Schema
const mongoose = require("mongoose")

const enharmonicExcersiseSchema = new Schema({
  sheetBackendTitle: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 80
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 80
  },
  backendTitle: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 80
  }
})

const EnharmonicsExcersises = mongoose.model(
  "EnharmonicsExcersises",
  enharmonicExcersiseSchema
)

const validateEnharmonicExcersise = enharmonicExcersise => {
  const schema = {
    sheetBackendTitle: Joi.string()
      .min(3)
      .max(80)
      .required(),
    title: Joi.string()
      .min(3)
      .max(80)
      .required(),
    backendTitle: Joi.string()
      .min(3)
      .max(80)
      .required()
  }
  return Joi.validate(enharmonicExcersise, schema)
}

exports.EnharmonicsExcersises = EnharmonicsExcersises
exports.validateEnharmonicExcersise = validateEnharmonicExcersise
