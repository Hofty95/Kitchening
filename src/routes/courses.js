const express = require('express');
const router = express.Router();
const {listadoProductos, detalleProducto, listadoporcategoria, agregarcurso, editarcurso, guardarCurso, guardarCursoEditado, eliminarCurso} = require("../controllers/coursesController");
const { uploadCoursesImages } = require('../middleware/upload');
const addCourseValidator = require('../validations/addCourseValidator');
const editCourseValidator = require('../validations/editCourseValidator');


/* /courses */
router.get("/list", listadoProductos);
router.get("/detail/:id", detalleProducto);
router.get("/category/:idCategory", listadoporcategoria);
router.get("/edit/:id", editarcurso);
router.get("/add", agregarcurso);
router.post("/add", uploadCoursesImages, addCourseValidator, guardarCurso);
router.put("/edit/:id", uploadCoursesImages, editCourseValidator, guardarCursoEditado);
router.delete("/delete/:id", eliminarCurso);


module.exports = router;