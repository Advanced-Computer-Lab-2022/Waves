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
    //res.render("guest");















// InstructorController.post('/instructor', async(req, res) => {
//   try {
//       console.log(req.body)
//         const MongoClient = require('mongodb').MongoClient;
//         const uri =   `mongodb+srv://Adam2431:Waves2431@waves.0kjx7bl.mongodb.net/test`;
//         const client = new MongoClient(uri, { useNewUrlParser: true });
//         await client.connect();
//         const newCourse = new Course ({
//             title: req.body.title,
//             subtitle: req.body.subtitle,
//             price: req.body.price,
//             shortSummary: req.body.shortSummary,
//             //totalHours: req.body.totalHours
//         })
//         await client.db('Online-Learning-System').collection('Courses').insertOne(newCourse)
//         client.close()
//         res.redirect('/instructor')
//   } catch (error) {
//     console.log(error)
//       if(error.code == 11000) {
//           res.render('instructor', {
//               err: "This Course is already registered!"
//           })
//       } else
//       res.render('instructor', {
//           err: "Course added successfully!"
//       })
//   }
// })