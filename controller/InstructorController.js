//const mongoose = require("mongoose");
//var router = express.Router();

const Courses = require("../models/Courses");
const Instructor = require("../models/Instructor");

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

async function getMyCoursesRatings (courses, username){
const coursesratings={};
filteredcourses= courses.filter(item => item.givenBy==username);
filteredcourses.forEach(course => {coursesratings.push(course.courseRating)
    
});


}
async function getMyCoursesReviews (courses, username){
const coursesreviews={};
filteredcourses.filter(item => item.givenBy==username);
filteredcourses.forEach(course => {coursesreviews.push(course.courseReviews)
    
});


}

async function getMyRatings (instructor, username){
    const instructorratings={};
     filteredinstructors.filter(item => item.givenBy==username);
     filteredinstructors.forEach(instructor1 => {instructorratings.push(Instructor.instructorRatings)
    
});


}
async function getMyReviews (instructor, username){
    const instructorreviews={};
filteredinstructors.filter(item => item.givenBy==username);
filteredinstructors.forEach(instructor1 => {instructorreviewss.push(Instructor.instructorReviews)
    
});


}

module.exports= {addCourse, getMyCourses};