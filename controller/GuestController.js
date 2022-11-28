const Courses = require("../models/Courses");
const IndividualTrainee = require("../models/IndividualTrainee");
const Instructor = require("../models/Instructor");
let Administrator = require("../models/Users/Administrator");
const CorporateTrainee = require("../models/users/CorporateTrainee");

async function getInbox(username) {
    let admins = await Administrator.find({}).exec();
    admins.forEach(element => {
        if(element.username == username){
            return element.inbox;
        }
    });

    let individualTrainees = await IndividualTrainee.find({}).exec();
    individualTrainees.forEach(element => {
        if(element.username == username){
            return element.inbox;
        }
    });

    let corporateTrainees = await CorporateTrainee.find({}).exec();
    corporateTrainees.forEach(element => {
        if(element.username == username){
            return element.inbox;
        }
    });

    let instructors = await Instructor.find({}).exec();
    instructors.forEach(element => {
        if(element.username == username){
            return element.inbox;
        }
    });
}

async function authenticateUser (body){
    let admins = await Administrator.find({}).exec();
    let isAdmin = false;
    admins.forEach(element => {
        if(element.username == body.username && element.password == body.password){
            isAdmin = true;
        }
    });

    let individualTrainees = await IndividualTrainee.find({}).exec();
    let isIndividualTrainee = false;
    individualTrainees.forEach(element => {
        if(element.username == body.username && element.password == body.password){
            isIndividualTrainee = true;
        }
    });

    let corporateTrainees = await CorporateTrainee.find({}).exec();
    let isCorporateTrainees = false;
    corporateTrainees.forEach(element => {
        if(element.username == body.username && element.password == body.password){
            isCorporateTrainees = true;
        }
    });

    let instructors = await Instructor.find({}).exec();
    let isInstructor = false;
    instructors.forEach(element => {
        if(element.username == body.username && element.password == body.password){
            isInstructor = true;
        }
    });
    
}

async function getCourses (){
    let courses = await Courses.find({}).exec();
    return courses;
}

async function searchFilterCourses (searchTerm, rating, subject, price){
    let courses = await Courses.find({}).exec();
    let filteredCourses = courses.filter(item => (item.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || searchTerm=="") && (item.courseRating==rating || rating==null) && (item.subject==subject || subject==null) && (item.price==price || price==null));
    return filteredCourses;
}

async function getCoursesByPrice (){
    const docs=await Courses.find({},'price').exec();
    //docs.wait()
    return docs
}
module.exports= {authenticateUser, getCourses, getCoursesByPrice, searchFilterCourses, getInbox};