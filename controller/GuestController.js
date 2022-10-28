const Courses = require("../models/Courses");
const IndividualTrainee = require("../models/IndividualTrainee");
const Instructor = require("../models/Instructor");
var Administrator = require("../models/Users/Administrator");
const CorporateTrainee = require("../models/users/CorporateTrainee");

async function authenticateUser (body){
    var admins = await Administrator.find({}).exec();
    var isAdmin = false;
    admins.forEach(element => {
        if(element.username == body.username && element.password == body.password){
            isAdmin = true;
        }
    });

    var individualTrainees = await IndividualTrainee.find({}).exec();
    var isIndividualTrainee = false;
    individualTrainees.forEach(element => {
        if(element.username == body.username && element.password == body.password){
            isIndividualTrainee = true;
        }
    });

    var corporateTrainees = await CorporateTrainee.find({}).exec();
    var isCorporateTrainees = false;
    corporateTrainees.forEach(element => {
        if(element.username == body.username && element.password == body.password){
            isCorporateTrainees = true;
        }
    });

    var instructors = await Instructor.find({}).exec();
    var isInstructor = false;
    instructors.forEach(element => {
        if(element.username == body.username && element.password == body.password){
            isInstructor = true;
        }
    });

    if(isAdmin){
        return "admin"
    }
    else if(isCorporateTrainees){
        return "corporate"
    }
    else if(isInstructor){
        return "instructor"
    }
    else if(isIndividualTrainee){
        return "individual"
    }
    else{
        return "no one"
    }
}

async function getCourses (){
    var courses = await Courses.find({}).exec();
    return courses;
}

async function getSearchedCourses (searchTerm){
    var courses = await Courses.find({}).exec();
    var searchedCourses = courses.filter(item => item.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
    return searchedCourses;
}


async function getCoursesByPrice (){
    const docs=await Courses.find({},'price').exec();
    //docs.wait()
    return docs
}
module.exports= {authenticateUser, getCourses, getCoursesByPrice, getSearchedCourses};