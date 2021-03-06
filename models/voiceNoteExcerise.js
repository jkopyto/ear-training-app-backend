const { Instruments } = require("./enums/Instruments")
const { ScaleNotes } = require("./enums/ScaleNotes")
const { VoicePosition } = require("./enums/VoicePosition")
const {
  PianoKeybardRightAnswers
} = require("./enums/PianoKeyboardRightAnswers")
const Joi = require("joi")
const Schema = require("mongoose").Schema
const mongoose = require("mongoose")

const voiceNoteExcersiseSchema = new Schema({
  rightAnswer: {
    type: String,
    required: true,
    enum: PianoKeybardRightAnswers
  },
  backendTitle: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 80
  },
  instrument: {
    type: String,
    required: true,
    enum: Instruments
  },
  startingVoiceNote: {
    type: String,
    required: true,
    enum: ScaleNotes
  },
  givenVoicePosition: {
    type: String,
    required: true,
    enum: VoicePosition
  },
  excersiseNotePosition: {
    type: String,
    required: true,
    enum: VoicePosition
  }
})

const VoiceNoteExcersise = mongoose.model(
  "VoiceNoteExcersise",
  voiceNoteExcersiseSchema
)

const validateVoiceNoteExcersise = voiceNoteExcersise => {
  const schema = {
    rightAnswer: Joi.string().required(),
    backendTitle: Joi.string()
      .min(3)
      .max(80)
      .required(),
    instrument: Joi.string().required(),
    startingVoiceNote: Joi.string().required(),
    givenVoicePosition: Joi.string().required(),
    excersiseNotePosition: Joi.string().required()
  }
  return Joi.validate(voiceNoteExcersise, schema)
}

exports.VoiceNoteExcersise = VoiceNoteExcersise
exports.validateVoiceNoteExcersise = validateVoiceNoteExcersise
