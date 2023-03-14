const {check} = require("express-validator")

module.exports = [
    check("title")
        .notEmpty().withMessage("* El titulo de curso es obligatorio").bail()
        .isLength({min:5,max:500}).withMessage("* El titulo debe tener como minimo 5 caracteres y un maximo de 500"),
    check("price")
        .notEmpty().withMessage("* El curso debe tener precio").bail()
        .isInt({min:1}).withMessage("solo numeros positivos"),
    check("chef")
        .notEmpty().withMessage("* Quien es el chef?"),
    check("status")
        .notEmpty().withMessage("* Cual es el estado del curso?"),
     check("category")
        .notEmpty().withMessage("* a que categoria pertenece?"),
    check("description")
        .notEmpty().withMessage("* La descripcion de curso es obligatoria").bail()
        .isLength({min:20,max:80}).withMessage("* La descripcion debe tener como minimo 20 caracteres y un maximo de 80"),

]