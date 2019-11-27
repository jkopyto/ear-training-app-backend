const auth = require("../middleware/auth")
const express = require("express")
const _ = require("lodash")
const { User } = require("../models/user")
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

  const user = await User.findById(req.user._id)
  if (!user || !user.addNewRes) return res.status(403).send("Forbidden")

  let voiceNoteExcerise = new VoiceNoteExcersise(
    _.pick(req.body, [
      "rightAnswer",
      "backendTitle",
      "instrument",
      "startingVoiceNote",
      "givenVoicePosition",
      "excersiseNotePosition"
    ])
  )

  voiceNoteExcerise = await voiceNoteExcerise.save()

  return res.status(200).send(voiceNoteExcerise)
})

module.exports = router
