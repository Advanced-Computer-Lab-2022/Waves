var Courses=require("../models/Courses"); 
var Questions=require("../models/Question"); 
var Exams=require("../models/Exam"); 
var ExamSolution=require("../models/ExamSolution");

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

async function getMyCourses (courses, username){
    return courses.filter(item => item.givenBy==username);
}

async function getSpecificExam (belongsToCourse, name){
    var exams = await Exams.find({}).exec();
    var questions = await Questions.find({}).exec();
    var subExams= exams.filter(item => (item.belongsToCourse==belongsToCourse && item.name==name));
    //console.log(subExams + " ************************")
    return questions.filter(item => (item.belongsToExam==name && subExams.name==name));
}

module.exports= {getCourses,getCoursesByPrice,takeExam,getMyCourses, getExams, getSpecificExam};
    //res.render("guest");