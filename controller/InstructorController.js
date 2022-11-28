//const mongoose = require("mongoose");
//let router = express.Router();

const Courses = require("../models/Courses");

function addCourse (body, username){
    const newCourse =new Courses({
        title: body.title,
        subtitle: body.subtitle,
        price: body.price,
        shortSummary: body.shortSummary,
        totalHours: body.totalHours,
        courseRating: body.rating,
        subject: body.subject,
        givenBy: username     
 });
    newCourse.save();
}

async function getMyCourses (courses, username){
    return courses.filter(item => item.givenBy==username);
}

module.exports= {addCourse, getMyCourses};
    //res.render("guest");









module.exports= {addCourse, getMyCourses};
