const fs = require("fs")
const courses = require("../data/courses.json");
const categories = require("../data/categories.json");
const chefs = require("../data/chefs.json");
const productStatus = require("../data/status.json");
const { validationResult }  = require("express-validator")

const db = require('../database/models')

/*  */
module.exports = {
    listadoProductos : (req, res) => {
        return res.render("courses/listaCursos", {
            courses,
            categories,
            productStatus
        })
    },
    detalleProducto : (req, res) => {

        const {id} = req.params
        const course = courses.find((course) => course.id === +id)
        return res.render("courses/detalleCurso",{
            course,
            categories,
            productStatus : productStatus.find(status => status.name == course.status)
        });
    },
    listadoporcategoria : (req, res) => {

    const {idCategory} = req.params
       const coursesFound = courses.filter((course) => course.idCategory === +idCategory)
       return res.render("courses/listaCursos",{
        courses : coursesFound,
        categories,
        productStatus
     });

    },
    agregarcurso : (req,res) => {
        return res.render("courses/add",{
            categories,
            chefs,
            productStatus
        })
    },
    editarcurso : (req,res) => {
        const {id} = req.params
        const course = courses.find(course => course.id === +id)

        return res.render("courses/edit",{
            ...course,
            categories,
            chefs,
            productStatus
        })
    },
    guardarCurso : (req,res) => {
        const errors = validationResult(req)

        if (req.fileValidationError) {
            errors.errors.push({
                value : "",
                msg : req.fileValidationError,
                param : "images",
                location : "files"
            })
        }

        if (errors.isEmpty()){
        const {title, price, description, status, chef, idCategory} = req.body

        const newCourse = {
            id : courses[courses.length - 1].id + 1,
            title : title,
            price : +price,
            description: description,
            images: req.files.map(file => file.filename),
            status : status,
            chef: chef,
            idCategory : +idCategory
        }
        
        courses.push(newCourse)

        fs.writeFileSync("./data/courses.json",JSON.stringify(courses, null, 3), "utf-8");

        return res.redirect(`/courses/detail/${newCourse.id}`);
        
        }else{

            if (req.files.lenght) {
                req.files.forEach(file => {
                    fs.existsSync(`./public/images/courses/${file.filename}`) && fs.unlinkSync(`./public/images/courses/${file.filename}`)
                })
            }


            return res.render("courses/add",{
            categories,
            chefs,
            productStatus,
            errors : errors.mapped(),
            old : req.body
            })
        }

        /* return res.send(newCourse) */
    },
    guardarCursoEditado : (req,res) => {
        const errors = validationResult(req)

        if (errors.isEmpty()) {
        const {title, price, description, status, chef, idCategory} = req.body
        const {id} = req.params
        const course = courses.find(course => course.id === +id);

        const courseEdited = {
            id : course.id,
            title : title,
            price : +price,
            description: description,
            images: req.files.length ? req.files.map(file => file.filename) : course.images,
            status : status,
            chef: chef,
            idCategory : +idCategory
        }

        const coursesModified = courses.map(course => {
            if(course.id === +id){

                if(req.files.lenght){
                    course.images.forEach(image => {
                        fs.existsSync(`./public/images/courses${image}`) && fs.unlinkSync(`./public/images/courses${image}`)
                    });
                }
                return courseEdited
            }
            return course
          });
        

        fs.writeFileSync("./data/courses.json",JSON.stringify(coursesModified, null, 3), "utf-8");

        return res.redirect(`/courses/detail/${courseEdited.id}`);
        }else{

            const {id} = req.params
            const course = courses.find(course => course.id === +id)
    
            if(req.files.length){
                req.files.forEach(file => {
                  fs.existsSync(`./public/images/courses/${file.filename}`) && fs.unlinkSync(`./public/images/courses/${file.filename}`)
        
                });
            }

            return res.render("courses/edit",{
                ...course,
                categories,
                chefs,
                productStatus,
                errors : errors.mapped(),
                old : req.body
            })
        }

    },
    eliminarCurso : (req, res) => {
        const id = req.params.id;
        const coursesModified = courses.filter(course => course.id !== +id);

        fs.writeFileSync('./data/courses.json',JSON.stringify(coursesModified, null, 3),'utf-8')

        return res.redirect(`/courses/list`)
    }
}