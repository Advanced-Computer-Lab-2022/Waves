//const mongoose = require("mongoose");
//var router = express.Router();

const Courses = require("../models/Courses");

function addCourse (body){
    const newCourse =new Courses({
        title: body.title,
        subtitle: body.subtitle,
        price: body.price,
        shortSummary: body.shortSummary,
        totalHours: body.totalHours,
        courseRating: 5
 });
    newCourse.save();
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
module.exports= {addCourse,getCourses,getCoursesByPrice};
    //res.render("guest");















// InstructorController.post('/instructor', async(req, res) => {
//   try {
//       console.log(req.body)
//         const MongoClient = require('mongodb').MongoClient;
//         const uri =   `mongodb+srv://Adam2431:Waves2431@waves.0kjx7bl.mongodb.net/test`;
//         const client = new MongoClient(uri, { useNewUrlParser: true });
//         await client.connect();
//         const newCourse = new Course ({
//             title: req.body.title,
//             subtitle: req.body.subtitle,
//             price: req.body.price,
//             shortSummary: req.body.shortSummary,
//             //totalHours: req.body.totalHours
//         })
//         await client.db('Online-Learning-System').collection('Courses').insertOne(newCourse)
//         client.close()
//         res.redirect('/instructor')
//   } catch (error) {
//     console.log(error)
//       if(error.code == 11000) {
//           res.render('instructor', {
//               err: "This Course is already registered!"
//           })
//       } else
//       res.render('instructor', {
//           err: "Course added successfully!"
//       })
//   }
// })