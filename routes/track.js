const auth = require("../middleware/auth")
const express = require("express")
const { User } = require("../models/user")
const { Track, validateTrack } = require("../models/track")

const router = express.Router()

router.get("/:id", async (req, res) => {
  const id = req.params.id.replace(".mp3", "")
  const trackId = await Track.findById(id)
  if (!trackId) return res.status(400).send("There is no track with that id")

  const filePath = `public/tracks/${req.params.id}`
  res.download(filePath, trackId.title)
})

router.get("/test/:id", async (req, res) => {
  const filePath = `public/tracks/${req.params.id}.xml`
  res.download(filePath, "test")
})

router.get("/title/:title", [auth], async (req, res) => {
  const track = await Track.findOne({ title: req.params.title })
  if (!track) return res.status(400).send("There is no track with given title")

  res.status(200).send(track._id)
})

router.post("/new", [auth], async (req, res) => {
  const error = validateTrack(req.body)
  if (error.message) return res.status(400).send("Invalid body")

  const user = await User.findById(req.user._id)
  if (!user || !user.addNewRes) return res.status(403).send("Forbidden")

  let track = await Track.findOne({
    title: req.body.title
  })
  if (track) return res.status(400).send("Track already exists")

  track = new Track({
    title: req.body.title
  })

  track = await track.save()

  return res.status(200).send(`Added new track to list, trackId: ${track._id}`)
})

module.exports = router
