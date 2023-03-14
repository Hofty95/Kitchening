const categories = require("../data/categories.json");
const courses = require("../data/courses.json");
const productStatus = require("../data/status.json");

module.exports = {
    home : (req, res, next) => {
        return res.render('home', {
          categories,
          courses,
          productStatus
        })
      }
}