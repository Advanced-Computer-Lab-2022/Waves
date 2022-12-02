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



async function giveRatingCourses (username, rating,coursename){
    let Courses1= await Courses.find({title:coursename}).exec()
    let Flag1=0;
    let Flag2=false;

for(let i=0;i<Courses1.rating.length-1;i++)
{
if(Courses1.rating[0][i]==username)
Flag1=i;
Flag2=true;
break;
}
if(flag2)
{
Courses1.rating[Flag1][1] =rating  
}
else{
    Courses1.rating.push[username,rating]
}
}
async function giveRatinginstructor (username, rating,instructorname){
    let instructor1= await Instructor.find({username:instructorname}).exec()
    let Flag1=0;
    let Flag2=false;

for(let i=0;i<instructor1.rating.length-1;i++)
{
if(instructor1.rating[0][i]==username)
Flag1=i;
Flag2=true;
break;
}
if(flag2)
{
instructor1.rating[Flag1][1] =rating  
}
else{
instructor1.rating.push[username,rating]
}
}



module.exports= {getCourses,giveRatingCourses,giveRatinginstructor};