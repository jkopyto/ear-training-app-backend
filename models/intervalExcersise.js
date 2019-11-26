const { NoteType } = require("./enums/NoteType")
const { PlayingStyle } = require("./enums/PlayingStyle")
const { Answers } = require("./enums/Answers")
const Joi = require("joi")
const Schema = require("mongoose").Schema
const mongoose = require("mongoose")

const intervalExcersiseSchema = new Schema({
  notes: {
    type: [String],
    enum: NoteType,
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
