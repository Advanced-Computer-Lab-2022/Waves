//const mongoose = require("mongoose");
//var router = express.Router();

const Courses = require("../models/Courses");
const Question = require("../models/Question");
const Exam=require("../models/Exam");

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
        belongsToCourse: body.belongsToCourse
    });
    newExam.save();
}

function addQuestionToExam (body){
    const newQuestion = new Question({
        belongsToExam: body.belongsToExam,
        c1: body.c1,
        c2: body.c2,
        c3: body.c3,
        c4: body.c4,
        solution: body.solution
    });
    newQuestion.save();
}

module.exports= {addCourse, getMyCourses,addExam, addQuestionToExam};
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