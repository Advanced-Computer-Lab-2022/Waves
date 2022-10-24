var Administrator = require("../models/Users/Administrator");

async function authenticateUser (body){
    const docs=await Administrator.find({}).exec();
    print(docs)
}

async function getCourses (){
    const docs=await Courses.find({},'title totalHours courseRating').exec();
    //docs.wait()
    return docs
}

async function getCoursesByPrice (){
    const docs=await Courses.find({},'price').exec();
    //docs.wait()
    return docs
}
module.exports= {authenticateUser,getCourses,getCoursesByPrice};