const auth = require("../middleware/auth")
const express = require("express")
const {
  EnharmonicsExcersises,
  validateEnharmonicExcersise
} = require("../models/enharmonicExcersise")
const { User } = require("../models/user")
const _ = require("lodash")

const router = express.Router()

router.get("/", [auth], async (req, res) => {
  const excersises = await EnharmonicsExcersises.find()
  if (!excersises)
    return res
      .status(400)
      .send("Something went wrong. There is no enharmonicsExcersises")

  res.status(200).send(excersises)
})

router.post("/new", [auth], async (req, res) => {
  const error = validateEnharmonicExcersise(req.body)
  if (error.message) return res.status(400).send("Invalid body")

  const user = await User.findById(req.user._id)
  if (!user || !user.addNewRes) return res.status(403).send("Forbidden")

  let enharmonicExcersise = new EnharmonicsExcersises(
    _.pick(req.body, ["sheetBackendTitle", "title", "backendTitle"])
  )

  enharmonicExcersise = await enharmonicExcersise.save()

  return res.status(200).send(enharmonicExcersise)
})

module.exports = router