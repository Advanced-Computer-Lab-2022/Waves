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

    
    const isAdmin = await Administrator.findOne({username:body.username , password:body.password})
    if(isAdmin){
        return 'admin';
    }

    const isIndividualTrainee = await IndividualTrainee.findOne({username:body.username , password:body.password})
    if(isIndividualTrainee){
        return 'individual';
    }

    const isCorporateTrainee = await CorporateTrainee.findOne({username:body.username , password:body.password})
    if(isCorporateTrainee){
        return 'corporate';
    }

    const isInstructor = await Instructor.findOne({username:body.username , password:body.password})
    if(isInstructor){
        return 'instructor';
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