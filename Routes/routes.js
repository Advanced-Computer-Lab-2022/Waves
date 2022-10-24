var express = require("express");
var instructorController = require("../controller/InstructorController");
var adminController = require("../controller/AdminController");
var guestController = require("../controller/GuestController");
var IndividualTrainee = require("../models/IndividualTrainee"); 
var Administrator = require("../models/Users/Administrator"); 

var router = express.Router();

router.get("/", function(req,res){
    res.render("home");
});

router.get("/sign-up", function(req,res){
    res.render("sign_up", {
        err:''
    });
});

router.get("/terms", function(req,res){
    res.render("terms");
});

router.get("/admin", function(req,res){
    res.render("admin");
});

router.post("/sign-up", function(req,res){
    res.render("sign_up", {
        err:''
    });
});

router.post("/login", function(req,res){
    res.render("login", {
        err: ''
    })
});

router.post("/administrator", function(req,res){
    res.render("admin");
});

router.post("/add-administrator", function(req,res){
    res.render("add-admin");
});

router.post("/add-instructor", function(req,res){
    res.render("add-instructor");
});

router.get("/instructor", function(req,res){
    res.render("instructor");
  });

router.post("/instructor", function(req,res){
    //console.log(req.body)
    instructorController.addCourse(req.body);
});

router.post("/add-admin", function(req,res){
    //console.log(req.body)
    adminController.addAdmin(req.body);
});

router.post("/add-corporate", function(req,res){
    //console.log(req.body)
    adminController.addCorporate(req.body);
});

router.post("/add-instructor", function(req,res){
    //console.log(req.body)
    adminController.addInstructor(req.body);
});

router.get("/getCourses", async(req,res) => {
    const get=await instructorController.getCourses()
    console.log(get)
    res.json(get);
});

router.post('/authenticate', async(req, res) =>{
    
    const user = await guestController.authenticateUser(req.body);
    if(user == "admin")
        res.redirect("/admin")
    else if(user == "individual")
        res.redirect("individual")
    else if(user == "corporate")
        res.redirect("corporate")
    else if(user == "instructor")
        res.redirect("instructor")
    else if(user == "no one")
        res.render("login", {
            err: "Username And Password are not matched, please try again!"
        })
    // try {
    //     if (results.length > 0) {
    //       results.forEach((result) => {
    //           if(result.username == req.body.username && result.password == req.body.password){
    //               req.session.isLoggedIn = true
    //               req.session.username = req.body.username
    //               res.redirect('./admin')
    //               boolean = false
    //           }
    //       });
    //     }
    //     if(boolean){
    //     res.render('login' , {
    //         err: 'Invalid Username and Password'
    //     })
    //     }
    // } catch (error) {
    //     console.log(error)
    // }
  })
router.get("/filterCourses", function(req,res){
    res.render("filterCourses");
  });
    // await client.db('Online-Learning-System').collection('Courses').insertOne(newCourse)
    // client.close()}
    //res.render("guest");


// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

router.post('/register', async(req, res) => {
  try {
        const newUser = new IndividualTrainee ({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            first: req.body.first,
            last: req.body.last,

        })
        newUser.save();
  } catch (error) {
    console.log(error)
      if(error.code == 11000) {
          res.render('sign_up', {
              err: "This Username is already taken!"
          })
      } else
      res.render('sign_up', {
          err: "Invalid Username Or Password!"
      })
  }
})

module.exports = router

