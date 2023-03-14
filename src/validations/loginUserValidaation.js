const {check, body} = require("express-validator")
const {compareSync} = require("bcryptjs")
const users = require("../data/users.json")

module.exports = [
    check("email")
        .notEmpty().withMessage("el email es obligatorio").bail()
        .isEmail().withMessage("El email tiene un formato incorrecto"),
    body("password")
        .notEmpty().withMessage("La contraseña es Obligatoria").bail()
        .custom((value, {req}) => {
            let user = users.find(user => user.email === req.body.email && compareSync(value, user.password));
            return user
        }).withMessage("Credenciales invalidas")
]