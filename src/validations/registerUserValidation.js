const {check, body} = require("express-validator")

module.exports = [
    check("name")
        .notEmpty().withMessage("* El nombre es obligatorio").bail()
        .isLength({min:2,max:10}).withMessage("* El nombre debe tener como minimo 2 caracteres y un maximo de 10").bail()
        .isAlpha().withMessage("* Solo caracteres alfabeticos"),
    check("surname")
        .notEmpty().withMessage("* El apellido es obligatorio").bail()
        .isLength({min:2,max:12}).withMessage("* El apellido debe tener como minimo 2 caracteres y un maximo de 12").bail()
        .isAlpha().withMessage("* Solo caracteres alfabeticos"),
    check("email")
        .notEmpty().withMessage("* El mail es obligatorio").bail()
        .isEmail().withMessage("* Debes ingresar un email valido!")
        .custom((value, {req}) => {
            let user = readJSON('users.json').find(user => user.email === value);
            return !user // user ? false : true
        }).withMessage('El email ya se encuentra registrado'),
    check("password")
        .notEmpty().withMessage("* La contraseña es obligatoria"),
    body("password2")
        .notEmpty().withMessage("* Debes repetir la contraseña")
        .custom((value,{req}) => {
            if (value !== req.body.password) {
                return false
            }
            return true
        }).withMessage("La contraseña no coincide")
]