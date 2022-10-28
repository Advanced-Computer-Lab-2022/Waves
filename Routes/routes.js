var express = require("express");
var instructorController = require("../controller/InstructorController");
var adminController = require("../controller/AdminController");
var guestController = require("../controller/GuestController");
var IndividualTrainee = require("../models/IndividualTrainee"); 
var Administrator = require("../models/Users/Administrator"); 

var router = express.Router();

router.get("/", async (req,res) => {
    if(req.session.user == "admin"){
        res.redirect("/admin")
    }
    else if(req.session.user == "individual"){
        res.redirect("/individual")
    }
    else if(req.session.user == "corporate"){
        res.redirect("/corporate")
    }
    else if(req.session.user == "instructor"){
        res.redirect("/instructor")
    }
    else{
        const allCourses = await guestController.getCourses();
        res.render("home", {data: '', courses: allCourses})
    }
});

router.get("/sign-up", function(req,res){
    res.render("sign_up", {
        err:''
    });
});

router.get("/terms", function(req,res){
    res.render("terms");
});

router.get("/admin", async(req,res) => {
    if(!req.session.isLoggedIn)
        res.redirect('./login')
    else {
        const allCourses = await guestController.getCourses();
        res.render("admin", {data: '', courses: allCourses})
    }
});

router.get("/login", function(req,res){
    res.render("login", {
        err: ''
    })
});

router.post("/logout", function(req,res){
    req.session.username = null
    req.session.password = null
    req.session.isLoggedIn = null
    req.session.user = null
    res.redirect("/")
});

router.post("/search", async(req,res) => {

    if(req.session.user == "admin"){
        const searchedCourses = await guestController.getSearchedCourses(req.body.searchTerm);
        res.render("admin", {data: '', courses: searchedCourses})
    }
    else if(req.session.user == "individual"){
        req.session.isLoggedIn = true
        req.session.username = req.body.username
        req.session.user = user;
        res.redirect("/individual");
    }
    else if(req.session.user == "corporate"){
        req.session.isLoggedIn = true
        req.session.username = req.body.username
        req.session.user = user;
        res.redirect("/corporate");
    }
    else if(req.session.user == "instructor"){
        req.session.isLoggedIn = true
        req.session.username = req.body.username
        req.session.user = user;
        res.redirect("/instructor");
    }
});

router.post("/add-admin", function(req,res){
    adminController.addAdmin(req.body);
    res.render("admin", {data: "Success!"});
    res.redirect("/admin")
});

router.post("/add-instructor", function(req,res){
    adminController.addInstructor(req.body);
    res.render("admin", {data: "Success!"});
    res.redirect("/admin")
});

router.post("/add-trainee", function(req,res){
    adminController.addCorporate(req.body);
    res.render("admin", {data: "Success!"});
    res.redirect("/admin");
});

router.get("/addCourse", function(req,res){
    res.render("addCourse");
  });

  router.get("/instructor", function(req,res){
    res.render("instructor");
  });

router.post("/addCourse", function(req,res){
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

router.post('/authenticate', async(req, res) =>{
    
    const user = await guestController.authenticateUser(req.body);
    
    if(user == "admin"){
        req.session.isLoggedIn = true;
        req.session.username = req.body.username;
        req.session.user = user;
        res.redirect("/admin");
    }
    else if(user == "individual"){
        req.session.isLoggedIn = true
        req.session.username = req.body.username
        req.session.user = user;
        res.redirect("/individual");
    }
    else if(user == "corporate"){
        req.session.isLoggedIn = true
        req.session.username = req.body.username
        req.session.user = user;
        res.redirect("/corporate");
    }
    else if(user == "instructor"){
        req.session.isLoggedIn = true
        req.session.username = req.body.username
        req.session.user = user;
        res.redirect("/instructor");
    }
    else {
        res.render("login", {err: "Username And Password are not matched, please try again!"})
    }
});

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

