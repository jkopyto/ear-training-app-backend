const bcrypt = require("bcrypt")
const { User, validate } = require("../models/user")
const express = require("express")

const router = express.Router()

router.post("/", async (req, res) => {
  const error = validate(req.body)
  if (error.message) return res.status(400).send(error.message)

  const user = await User.findOne({
    email: req.body.email
  })
  if (!user) return res.status(400).send("Invalid email or password")

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) res.status(400).send("Invalid email or password")

  const token = user.generateAuthToken()
  res.send({
    jwtToken: token
  })
})

module.exports = router
