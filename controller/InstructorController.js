//const mongoose = require("mongoose");
//var router = express.Router();

const Courses = require("../models/Courses");
const Question = require("../models/Question");
const Exam=require("../models/Exam");
const Instructor=require("../models/Instructor");
function addCourse (body, username){
    const newCourse = new Courses({
        title: body.title,
        subtitles: body.subtitle,
        price: body.price,
        img: body.img,
        videoLinks: body.videoLinks,
        description: body.description,
        totalHours: body.totalHours,
        rating: [1.2,79],
        subject: body.subject,
        videoPreview: body.videoPreview,
        givenBy: body.givenBy     
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



async function getinstructorAvgRatings(instructorename){
    let insInstructor= await Instructor.find({username:instructorname}).exec()
    TotalRatings = insInstructor.rating.length;
    sum=0;
   
   
   insInstructor.rating.forEach(instructor => {sum=sum+instructor[1]});
   Avgratings= sum/TotalRatings
   
   FinalRating =[Avgratings,TotalRatings];
   
   
   return FinalRating;
   
   }





module.exports= {addCourse, getMyCourses,addExam, addQuestionToExam, getMyRating, getinstructorAvgRatings};
    //res.render("guest");
