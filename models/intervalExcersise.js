import NoteType from "./enums/NoteType"
import PlayingStyle from "./enums/PlayingStyle"
import Answers from "./enums/Answers"
const Joi = require("joi")
const Schema = require("mongoose").Schema
const mongoose = require("mongoose")

const intervalExcersiseSchema = new Schema({
  notes: {
    type: [[NoteType]],
    required: true
  },
  playingStyle: {
    type: String,
    required: true,
    enum: PlayingStyle
  },
  rightAnswer: {
    type: String,
    required: true,
    enum: Answers
  }
})

const IntervalExcersises = mongoose.model(
  "IntervalExcersises",
  intervalExcersiseSchema
)

const validateIntervalExcersise = intervalExcersise => {
  const schema = {
    notes: Joi.array().required(),
    playingStyle: Joi.string().required(),
    rightAnswer: Joi.string().required()
  }
  return Joi.validate(intervalExcersise, schema)
}

exports.IntervalExcersises = IntervalExcersises
exports.validateIntervalExcersise = validateIntervalExcersise
