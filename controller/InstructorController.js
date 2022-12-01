//const mongoose = require("mongoose");
//var router = express.Router();

const Courses = require("../models/Courses");
const Question = require("../models/Question");
const Exam=require("../models/Exam");
const Instructor=require("../models/Instructor");
function addCourse (body, username){
    const newCourse = new Courses({
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

function addExam (body){
    const newExam = new Exam({
        belongsToCourse: body.belongsToCourse,
        name: body.belongsToExam
    });
    newExam.save();
}
function addQuestionToExam (body){
    const newQuestion = new Question({
        belongsToExam: body.belongsToExam,
        question: body.question,
        c1: body.c1,
        c2: body.c2,
        c3: body.c3,
        c4: body.c4,
        solution: body.solution
    });
    newQuestion.save();
}
async function getMyRating (name){
    const thisinstructor = await Instructor.findOne({username : name}).exec()
    return thisinstructor.rating;
}
async function getMyCoursesratings (username){
 
 var instructorcourses= await Courses.find({givenBy:username}).exec()
 
 //onsole.log(instructorcourses[0])
 return instructorcourses;
}


module.exports= {addCourse, getMyCourses,addExam, addQuestionToExam, getMyRating,  getMyCoursesratings};
    //res.render("guest");
