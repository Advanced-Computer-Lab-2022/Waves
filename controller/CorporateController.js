let Courses=require("../models/Courses"); 

async function getCourses (){
    const docs=await Courses.find({},'title totalHours courseRating').exec();
    //docs.wait()
    return docs
}

module.exports= {getCourses};