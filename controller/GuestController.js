const Courses = require("../models/Courses");
const IndividualTrainee = require("../models/IndividualTrainee");
const Instructor = require("../models/Instructor");
var Administrator = require("../models/Users/Administrator");
const CorporateTrainee = require("../models/users/CorporateTrainee");

async function getInbox(username) {
    let admins = await Administrator.find({}).exec();
    let inbox;
    admins.forEach(element => {
        if(element.username == username){
            inbox = element.inbox;
        }
    });

    return inbox;
}

async function authenticateUser (body){
    var admins = await Administrator.find({}).exec();
    var isAdmin = false;
    admins.forEach(element => {
        if(element.username == body.username && element.password == body.password){
            isAdmin = true;
            //ask a genius
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

    else if(isIndividualTrainee){
        return "individual"
    }

    else if(isInstructor){
        return "instructor"
    }

    else if(isCorporateTrainees){
        return "corporate"
    }
}

async function changePassword(){

    var userinfo= {oldPassword: oldPassword, newPassword1:newPassword1, newPassword2:newPassword2};
    var path="/users/changePassword/"+ localStorage.getItem('username');
    axios.put(path,userinfo,{headers:{}}).then(res =>{
      if(res.data.errors== "password changed succesfully")
         toMyInformation();
         else
          setErrors(res.data.errors);

    })
}

async function getCourses (){
    var courses = await Courses.find({}).exec();
    return courses;
}

async function searchFilterCourses (searchTerm, rating, subject, price){
    var courses = await Courses.find({}).exec();
    var filteredCourses = courses.filter(item => (item.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || searchTerm=="") && (item.courseRating==rating || rating==null) && (item.subject==subject || subject==null) && (item.price==price || price==null));
    return filteredCourses;
}

async function getCoursesByPrice (){
    const docs=await Courses.find({},'price').exec();
    //docs.wait()
    return docs
}
module.exports= {authenticateUser, getCourses, getCoursesByPrice, searchFilterCourses, getInbox, changePassword};