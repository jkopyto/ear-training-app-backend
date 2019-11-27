const Joi = require("joi")
const Schema = require("mongoose").Schema
const mongoose = require("mongoose")

const trackSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  cover: {
    type: String,
    required: true,
    minlength: 3
  }
})

const Track = mongoose.model("Track", trackSchema)
const validateTrack = track => {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(50)
      .required(),
    cover: Joi.string()
      .min(3)
      .required()
  }
  return Joi.validate(track, schema)
}

exports.Track = Track
exports.validateTrack = validateTrack
