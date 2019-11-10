const auth = require("../middleware/auth")
const express = require("express")
const { Track } = require("../models/track")

const router = express.Router()

router.get("/:id", auth, async (req, res) => {
  const trackId = await Track.findById(req.params.id)
  if (!trackId) return res.status(400).send("There is no track with that id")

  const filePath = `/public/tracks/${trackId.title}`
  res.download(filePath, trackId.title)
})

module.exports = router
