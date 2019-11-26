const auth = require("../middleware/auth")
const express = require("express")
const _ = require("lodash")
const {
  VoiceNoteExcersise,
  validateVoiceNoteExcersise
} = require("../models/voiceNoteExcerise")

const router = express.Router()

router.get("/", [auth], async (req, res) => {
  const excersises = await VoiceNoteExcersise.find()
  if (!excersises)
    return res
      .status(400)
      .send("Something went wrong. There is no voiceNoteExcersises")

  res.status(200).send(excersises)
})

router.post("/new", [auth], async (req, res) => {
  const error = validateVoiceNoteExcersise(req.body)
  if (error.message) return res.status(400).send("Invalid body")

  let voiceNoteExcerise = new VoiceNoteExcersise(
    _.pick[("title", "cover", "backendTitle", "key", "rightAnswer")]
  )

  voiceNoteExcerise = await voiceNoteExcerise.save()

  return res.status(200).send(voiceNoteExcerise)
})

module.exports = router
