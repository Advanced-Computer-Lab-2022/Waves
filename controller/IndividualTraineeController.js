var Courses=require("../models/Courses"); 
var Questions=require("../models/Question"); 
var Exams=require("../models/Exam"); 
var ExamSolution=require("../models/ExamSolution");
const IndividualTrainee = require("../models/users/IndividualTrainee");
const bcrypt = require('bcrypt');
const Instructor = require("../models/users/Instructor");

async function getCourses (){
    const docs=await Courses.find({},'title totalHours courseRating').exec();
    //docs.wait()
    return docs
}

async function getExams (){
    const docs=await Exams.find({},'belongsToCourse name').exec();
    //docs.wait()
    return docs
}

async function getCoursesByPrice (){
    const docs=await Courses.find({},'price').exec();
    //docs.wait()
    return docs
}

function takeExam (body){
    const newExamSolution = new ExamSolution({
        s1: body.s1,
        s2: body.s2,
        s3: body.s3,
        s4: body.s4
    });
    newExamSolution.save();
}

function CalculateExamResult (body){
    var score=0;
    const newExam = new Exam({
        belongsToCourse: body.belongsToCourse,
        name: body.belongsToExam
    });
    newExam.save();
}

async function getMyCourses (courses, username){
    return courses.filter(item => item.givenBy==username);
}

async function getSpecificExam (belongsToCourse, name){
    //var exams = await Exams.find({}).exec();
    //var questions = await Questions.find({}).exec();
    const specificExam= await Exams.findOne({belongsToCourse: belongsToCourse , name: name}).exec()
    //exams.filter(item => (item.belongsToCourse==belongsToCourse && item.name==name));
    //var subQuestions=questions.filter(item => (item.belongsToExam==name));
    //console.log(subQuestions)
    //console.log(specificExam.questions)
    return specificExam.questions
}

async function addPurchasedCourse (user, courseTitle, chapters){
    await IndividualTrainee.findOneAndUpdate({username: user}, {
        $addToSet:{
            courses: {courseTitle, chapters}
        }
    })
}

async function updateEmail (user, email){
    await IndividualTrainee.findOneAndUpdate({username: user}, {
        $set:{
            email: email 
        }
    })
}
async function updatePassword (user, password){
    encryptedPassword = await bcrypt.hash(password, 10);
    await IndividualTrainee.findOneAndUpdate({username: user}, {
        $set:{
            password: encryptedPassword 
        }
    })
}
async function updateBio (user, bio){
    await IndividualTrainee.findOneAndUpdate({username: user}, {
        $set:{
            bio: bio
        }
    })
}

async function adjustRating (title, userRating){
    await Courses.findOneAndUpdate({title: title}, {
        $addToSet:{
            rating: userRating
        }
    })
}

async function adjustRating2 (name, userRating){
    await Instructor.findOneAndUpdate({username: name}, {
        $addToSet:{
            rating: userRating
        }
    })
}

module.exports= {getCourses,getCoursesByPrice,takeExam,getMyCourses, getExams, getSpecificExam, CalculateExamResult, addPurchasedCourse, updateEmail, updatePassword, updateBio, adjustRating,adjustRating2};
    //res.render("guest");