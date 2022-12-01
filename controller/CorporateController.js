var Courses=require("../models/Courses"); 
const Instructor = require("../models/Instructor");
const NoofInstructorRatings=0;
const AvgInstructorRatings=0;
const NoofCourseRatings=0;
const AvgCourseRatings=0;


async function getCourses (){
    const docs=await Courses.find({},'title totalHours courseRating').exec();
    //docs.wait()
    return docs
}

async function InstructorRating (){
   
    const AvgInstructorRatings= (Instructor.instructorRating+AvgInstructorRatings)/NoofInstructorRatings;
    NoofInstructorRatings++;
    
    return AvgInstructorRatings ;
}

async function CourseRating (){
    
    const AvgCourseRatings= (Courses.CourseRating+AvgCourseRatings)/NoofCourseRatings;
    NoofCourseRatings++;
    
    return AvgCourseRatings;
}


module.exports= {getCourses};