const jwt = require("jsonwebtoken")
const config = require("config")

/* <--ProjApkInt-->
*
*  Funkcja wyciąga z nagłówka zapytania JWT Token użytkownika,
*  sprawdza czy istnieje oraz przekazuje informacje o użytkowniku
*  do metody kontrolera
*/
function auth(req, res, next) {
  const token = req.header("x-auth-token")
  if (!token) return res.status(401).send("Acces denied. No token provided.")

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"))
    req.user = decoded
    next()
  } catch (err) {
    res.status(400).send("Invalid token. Access denied")
  }
}

module.exports = auth
