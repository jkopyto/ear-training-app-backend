const auth = require("../middleware/auth")
const express = require("express")
const { User } = require("../models/user")
const { Sheet, validateSheet } = require("../models/sheet")

const router = express.Router()

router.get("/:id", async (req, res) => {
  const id = req.params.id.replace(".xml", "")
  const sheetId = await Sheet.findById(id)
  if (!sheetId) return res.status(400).send("There is no sheet with that id")

  const filePath = `public/tracks/${req.params / id}`
  res.download(filePath, sheetId.sheetTitle)
})

router.get("/title/:title", [auth], async (req, res) => {
  const sheet = await Sheet.findOne({ sheetTitle: req.params.title })
  if (!sheet) return res.send(400).send("There is no sheet with given title")

  res.status(200).send(sheet._id)
})

router.post("/new", [auth], async (req, res) => {
  const error = validateSheet(req.body)
  if (error.message) return res.status(400).send("Invalid body")

  const user = await User.findById(req.user._id)
  if (!user || !user.addNewRes) return res.status(403).send("Forbidden")

  let sheet = await Sheet.findOne({
    sheetTitle: req.body.sheetTitle
  })
  if (sheet) return res.status(400).send("Sheet already exists")

  sheet = new Sheet({
    sheetTitle: req.body.sheetTitle
  })

  sheet = await sheet.save()

  return res.status(200).send(`Added new sheet to list, sheetId: ${sheet._id}`)
})

module.exports = router
