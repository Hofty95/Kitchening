const categories = require("../data/categories.json")
const {validationResult} = require("express-validator")
const users = require("../data/users.json")
const {hashSync} = require("bcryptjs")
const fs = require("fs")

module.exports = {
    register : (req, res) => {
        return res.render("users/register",{categories})
    },
    processRegister: (req,res) => {
        
        const errors = validationResult(req)

        if(errors.isEmpty()){
            const {name, surname, email, password} = req.body;

            const newUser = {
                id : users.length ? users[users.length -1].id +1 : 1,
                name : name.trim(),
                surname : surname.trim(),
                email : email.trim(),
                password : hashSync(password, 10),
                rol : "user"
            }

            users.push(newUser);

            fs.writeFileSync("./data/users.json",JSON.stringify(users, null, 3), "utf-8");
            res.redirect("/users/login")

        }else{
            
            return res.render("users/register",{
                categories,
                errors : errors.mapped(),
                old : req.body
            })
        }

    },
    login : (req, res) => {
        return res.render("users/login", {categories})
    },
    processLogin: (req,res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {

            const{id, name, rol}= users.find(user => user.email === req.body.email)

            req.session.userLogin = {
                id,
                name,
                rol
            }
            if (req.body.remember != undefined) {
                res.cookie('remember',req.session.userLogin, { maxAge : 2000000 })
            }

           return res.redirect('/') 
        }else{
            return res.send(errors.mapped())
        }


    },
    profile : (req, res) => {
        return res.render("users/profile", {categories})
    },
}