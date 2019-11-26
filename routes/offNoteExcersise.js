const auth = require("../middleware/auth")
const express = require("express")
const {
  OffNoteExcersises,
  validateOffNoteExcersise
} = require("../models/offNoteExcersise")
const { User } = require("../models/user")
const _ = require("lodash")

const router = express.Router()

router.get("/", [auth], async (req, res) => {
  const excersises = await OffNoteExcersises.find()
  if (!excersises)
    return res
      .status(400)
      .send("Something went wrong. There is no offNoteExcersises")

  res.status(200).send(excersises)
})

router.post("/new", [auth], async (req, res) => {
  const error = validateOffNoteExcersise(req.body)
  if (error.message) return res.status(400).send("Invalid body")

  const user = await User.findById(req.user._id)
  if (!user || !user.addNewRes) return res.status(403).send("Forbidden")

  let offNoteExcersise = new OffNoteExcersises(
    _.pick(req.body, ["title", "cover", "backendTitle", "key", "rightAnswer"])
  )

  offNoteExcersise = await offNoteExcersise.save()

  return res.status(200).send(offNoteExcersise)
})

module.exports = router
