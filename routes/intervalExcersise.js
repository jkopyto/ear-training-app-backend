const auth = require("../middleware/auth")
const express = require("express")
const {
  IntervalExcersises,
  validateIntervalExcersise
} = require("../models/intervalExcersise")
const { User } = require("../models/user")
const _ = require("lodash")

const router = express.Router()

router.get("/", [auth], async (req, res) => {
  const excersises = await IntervalExcersises.find()
  if (!excersises)
    return res
      .status(400)
      .send("Something went wrong. There is no enharmonicsExcersises")

  res.status(200).send(excersises)
})

router.post("/new", [auth], async (req, res) => {
  const error = validateIntervalExcersise(req.body)
  if (error.message) return res.status(400).send("Invalid body")

  const user = await User.findById(req.user._id)
  if (!user || !user.addNewRes) return res.status(403).send("Forbidden")

  let intervalExcersise = new IntervalExcersises(
    _.pick(req.body, ["notes", "playingStyle", "rightAnswer"])
  )

  intervalExcersise = await intervalExcersise.save()

  return res.status(200).send(intervalExcersise)
})

module.exports = router
