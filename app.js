require('dotenv').config();
var express = require("express");
var path = require("path");
var routes = require("./Routes/routes");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser')
//const { Mongoose } = require("mongoose/lib");

console.log(process.env.ATLAS_URI);
mongoose.connect(process.env.ATLAS_URI);

app.use(bodyParser.urlencoded({
  extended: true
}));
//app.use(bodyParser.json());

var port=3000
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(routes);
app.listen(port, () => {
    console.log('listening on port '+port)
  })




//var helper=require("./controller/helper");

app.get('/AllCourses', async (req,res)=>{
  const AllCourses = await Course

})

//use('Online-Learning-System')
//db.Users.insertOne([{name: Adam}])

// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// var IndividualTrainee = mongoose.model('IndividualTrainee')
// var Course = mongoose.model('Course')
//const IndividualTrainee = require('./models/IndividualTrainee');
// var b=false

//   try {
//     mongoose.model('Course')  // it throws an error if the model is still not defined
//       b=true
//   } catch (e) {
//      b=false
//   }
// if (!b) {
//   var Course = mongoose.model('Course', CourseSchema)
// }





// connection to db
// const MongoClient = require('mongodb').MongoClient;
// const port = process.env.PORT || 3000;
// app.set("views", path.join(__dirname, "views"))
// app.set("view engine", "ejs")
// MongoClient.connect(
//   process.env.ATLAS_URI,
//   {
//       maxPoolSize:50,
//       wtimeoutMS:2500,
//       useNewUrlParser:true
//   }
// )
// .catch(err => {
//   console.error(err.stack)
//   process.exit(1)
// })
// .then(async client => {
//   
// })





// const port=3000;
// const url="mongodb+srv://Adam2431:Makrauser1@cluster0.4euql4k.mongodb.net/test"
// const connectionParmas={
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// mongoose
//   .connect(url,connectionParmas)
//   .then({} => {
//     console.info{"connected to db"};
// })
// .catch({e} => {
//   console.log{"error", e};
// });
// mongoose.connect(
//   `mongodb+srv://Adam2431:Makrauser1@cluster0.4euql4k.mongodb.net/test
//   `, 
//   {
//    useNewUrlParser: true, 
//    useUnifiedTopology: true 
//   }
// );

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

// app.set("port", process.env.PORT || 3000);

// app.set("views", path.join(__dirname, "views"))
// app.set("view engine", "ejs")


// app.post('/register', async(req, res) => {
//   try {
//       console.log(req.body)
//       // if(req.body.username == '' || req.body.password == '')
//       // res.render('sign_up', {
//       //     err: "Please fill both the username and password blanks!"
//       // })
//         const MongoClient = require('mongodb').MongoClient;
//         const uri =   `mongodb+srv://Adam2431:Waves2431@waves.0kjx7bl.mongodb.net/test`;
//         const client = new MongoClient(uri, { useNewUrlParser: true });
//         await client.connect();
//         const newUser = new IndividualTrainee ({
//             username: req.body.username,
//             password: req.body.password,
//             email: req.body.email,
//             first: req.body.first,
//             last: req.body.last,

//         })
//         await client.db('Online-Learning-System').collection('Individual Trainee').insertOne(newUser)
//         client.close()
//         res.redirect('/login')
//   } catch (error) {
//     console.log(error)
//       if(error.code == 11000) {
//           res.render('sign_up', {
//               err: "This Username is already taken!"
//           })
//       } else
//       res.render('sign_up', {
//           err: "Invalid Username Or Password!"
//       })
//   }
// })

// app.post('/register', async(req, res) => {
//   try {
//       console.log(req.body)
//       // if(req.body.username == '' || req.body.password == '')
//       // res.render('sign_up', {
//       //     err: "Please fill both the username and password blanks!"
//       // })
//         const MongoClient = require('mongodb').MongoClient;
//         const uri =   `mongodb+srv://Adam2431:Waves2431@waves.0kjx7bl.mongodb.net/test`;
//         const client = new MongoClient(uri, { useNewUrlParser: true });
//         await client.connect();
//         const newUser = new IndividualTrainee ({
//             username: req.body.username,
//             password: req.body.password,
//             email: req.body.email,
//             first: req.body.first,
//             last: req.body.last,

//         })
//         await client.db('Online-Learning-System').collection('Individual Trainee').insertOne(newUser)
//         client.close()
//         res.redirect('/login')
//   } catch (error) {
//     console.log(error)
//       if(error.code == 11000) {
//           res.render('sign_up', {
//               err: "This Username is already taken!"
//           })
//       } else
//       res.render('sign_up', {
//           err: "Invalid Username Or Password!"
//       })
//   }
// })



// app.post('/instructor', async(req, res) => {
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
    
//   }
// })