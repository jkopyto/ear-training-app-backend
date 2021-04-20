/* <--ProjApkInt-->
*
*   Plik index.js jest głównym punktem całej aplikacji backendowej,
* gdyż wywołuje i uruchamia kontrolery, przypisuje im odpowiednie ścieżki
* oraz łączy się z bazą danych.
* Dodatkowo możliwe jest osadzenie tzw. middlewares, czyli metod pośredniczących
* w komunikacji pomiędzy użytkownikiem a kontrolerami
* 
*/
const config = require("config")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const express = require("express")
const login = require("./routes/login")
const register = require("./routes/register")
const track = require("./routes/track")
const sheet = require("./routes/sheet")
const enharmonicExcersise = require("./routes/enharmonicExcersise")
const intervalExcersise = require("./routes/intervalExcersise")
const offNoteExcersise = require("./routes/offNoteExcersise")
const voiceNoteExcersise = require("./routes/voiceNoteExcersise")

const app = express()

/* <--ProjApkInt-->
*
*  W tym miejscu odbywa się sprawdzenie, czy plik konfiguracyjny zawiera klucz
*  "jwtPrivateKey" oraz czy posiada on jakąś wartość. Klucz prywatny
*  jest niezbędny do przeprowadzania autoryzacji oraz autentykacji.
*/
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.")
  process.exit(1)
}

/* <--ProjApkInt-->
*
*  Tutaj aplikacja próbuje się połączyć z bazą danych. W przypadku niepowodzenia zostanie
*  wyświetlony odpowiedni komunikat
*
*/
mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err))


/* <--ProjApkInt-->
*
*  Przykład uruchomienia funkcji middleware. Middleware express.json()
*  parsuje zapytania posiadające body w formacie json do JavaScriptowych obiektów
*
*/
app.use(express.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

/* <--ProjApkInt-->
*
*  Tutaj każdemu kontrolerowi przypisana jest jego ścieżka,
*  za którą będzie odpowiedzialny. W poniższym przypadku
*  kontroler "login" będzie odpowiedzialny za obsługę
*  zapytań przychodzących pod ścieżkę "/api/login",
*  np. "www.example.com/api/login"
*
*/
app.use("/api/login", login)
app.use("/api/register", register)
app.use("/api/tracks", track)
app.use("/api/sheets", sheet)
app.use("/api/enharmonic", enharmonicExcersise)
app.use("/api/interval", intervalExcersise)
app.use("/api/offNote", offNoteExcersise)
app.use("/api/voiceNote", voiceNoteExcersise)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
