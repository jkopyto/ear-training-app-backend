const config = require("config")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const express = require("express")
const login = require("./routes/login")
const register = require("./routes/register")
const track = require("./routes/track")
const sheet = require("./routes/sheet")

const app = express()

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.")
  process.exit(1)
}

mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err))

app.use(express.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use("/api/login", login)
app.use("/api/register", register)
app.use("/api/tracks", track)
app.use("/api/sheets", sheet)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
