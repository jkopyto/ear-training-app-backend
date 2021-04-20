const auth = require("../middleware/auth")
const express = require("express")
const {
  EnharmonicsExcersises,
  validateEnharmonicExcersise
} = require("../models/enharmonicExcersise")
const { User } = require("../models/user")
const _ = require("lodash")

/* <--ProjApkInt-->
*
*  Tworzę nową instancję klasy Router odpowiedzialną za
*  obsługę zapytań. Każda poniższa formuła składa się z:
*    - rodzaju zapytania (tutaj: POST i GET),
*    - ścieżki,
*    - funkcji w której dokonuję obsługi zapytania.
*  Do każdej formuły przekazana jest metoda middleware auth,
*  która przetwarza zapytanie zanim przekaże je do właściwej
*  funkcji odpowiadającej za obsługę
*/
const router = express.Router()

router.get("/", [auth], async (req, res) => {
  const excersises = await EnharmonicsExcersises.find()

/* <--ProjApkInt-->
*
*  Odwołuję się do kolekcji EnharmonicsExcersises i wyszukuję wszystkie
*  dokumenty jakie się tam znajdują. W przypadku braku dokumentów
*  zwracam odpowiedź o statusie 404 (Not Found) i z wiadomością
*/
  if (!excersises)
    return res
      .status(404)
      .send("Something went wrong. There is no enharmonicsExcersises")

/* <--ProjApkInt-->
*
*  Zwracam odpowiedź o statusie 200 (OK) wraz z wyszukanymi dokumentami
*/
  res.status(200).send(excersises)
})



/* <--ProjApkInt-->
*
*  Endpoint ten pozwala na dodanie nowych dokumentów do kolekcji
*  EnharmonicsExcersise
*/
router.post("/new", [auth], async (req, res) => {

/* <--ProjApkInt-->
*
*  Dokonuję walidacji ciała zapytania
*/
  const error = validateEnharmonicExcersise(req.body)
  if (error.message) return res.status(400).send("Invalid body")


/* <--ProjApkInt-->
*
*  Sprawdzam czy użytkownik posiada uprawnienia do dodawania zasobów
*/
  const user = await User.findById(req.user._id)
  if (!user || !user.addNewRes) return res.status(403).send("Forbidden")

  let enharmonicExcersise = new EnharmonicsExcersises(
    _.pick(req.body, ["sheetBackendTitle", "title", "backendTitle"])
  )

/* <--ProjApkInt-->
*
*  Zapisuję zaktualizowaną kolekcję
*/
  enharmonicExcersise = await enharmonicExcersise.save()

  return res.status(200).send(enharmonicExcersise)
})

module.exports = router
