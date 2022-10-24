var express = require("express");
var instructorController = require("../controller/InstructorController");
var adminController = require("../controller/AdminController");
var guestController = require("../controller/GuestController");

var router = express.Router();

router.get("/", function(req,res){
    res.render("home");
});

router.get("/sign-up", function(req,res){
    res.render("sign_up");
});

router.get("/terms", function(req,res){
    res.render("terms");
});

router.get("/admin", function(req,res){
    res.render("admin");
});

router.post("/sign-up", function(req,res){
    res.render("sign_up");
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

router.get("/getCoursesByPrice", async(req,res) => {
    const get=await instructorController.getCoursesByPrice()
    console.log(get)
    res.json(get);
});

router.post('/authenticate', async(req, res) => {
    guestController.authenticateUser(req);
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

module.exports = router

