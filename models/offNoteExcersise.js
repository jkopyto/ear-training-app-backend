const { Key } = require("./enums/Key")
const {
  PianoKeyboardRightAnswer
} = require("./enums/PianoKeyboardRightAnswers")
const Joi = require("joi")
const Schema = require("mongoose").Schema
const mongoose = require("mongoose")

const offNoteExcersiseSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 80
  },
  cover: {
    type: String,
    required: true,
    minlength: 3
  },
  backendTitle: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 80
  },
  key: {
    type: String,
    required: true,
    enum: Key
  },
  rightAnswer: {
    type: String,
    required: true,
    enum: PianoKeyboardRightAnswer
  }
})

const OffNoteExcersises = mongoose.model(
  "OffNoteExcersises",
  offNoteExcersiseSchema
)

const validateOffNoteExcersise = offNoteExcersise => {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(80)
      .required(),
    cover: Joi.string()
      .min(3)
      .required(),
    backendTitle: Joi.string()
      .min(3)
      .max(80)
      .required(),
    key: Joi.string().required(),
    rightAnswer: Joi.string().required()
  }
  return Joi.validate(offNoteExcersise, schema)
}

exports.OffNoteExcersises = OffNoteExcersises
exports.validateOffNoteExcersise = validateOffNoteExcersise
