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
        res.redirect("/corporateTrainee")
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
    const user = req.session.user
    const filteredCourses = await guestController.searchFilterCourses(req.body.searchTerm, req.body.rating, req.body.subject, req.body.price);
    if(user == "admin"){
        res.render(user, {data: '', courses: filteredCourses})  
    }
    else if(user == "individual"){
        res.render(user, {data: '', courses: filteredCourses})  
    }
    else if(user == "corporate"){
        res.render("corporateTrainee", {data: '', courses: filteredCourses})  
    }
    else if(user == "instructor"){
        const myFilteredCourses = await instructorController.getMyCourses(filteredCourses, req.session.username);
        console.log(req.body.showMyCourses)
        if(req.body.showYourCourses)
            res.render("instructor", {data: '', courses: myFilteredCourses})
        else
            res.render("instructor", {data: '', courses: filteredCourses})
    }
});

router.post("/add-admin", async(req,res) => {
    adminController.addAdmin(req.body);
    const allCourses = await guestController.getCourses();
    res.render("admin", {data: 'Success!', courses: allCourses})
});

router.post("/add-instructor", async(req,res) => {
    adminController.addInstructor(req.body);
    const allCourses = await guestController.getCourses();
    res.render("admin", {data: 'Success!', courses: allCourses})
});

router.post("/add-trainee", async(req,res) => {
    adminController.addCorporate(req.body);
    const allCourses = await guestController.getCourses();
    res.render("admin", {data: 'Success!', courses: allCourses})
});

router.get("/instructor", async(req,res) => {
    if(!req.session.isLoggedIn)
        res.redirect('./login')
    else {
        const allCourses = await guestController.getCourses();
        res.render("instructor", {data: '', courses: allCourses})
    }
});

router.get("/corporateTrainee", async(req,res) => {
    if(!req.session.isLoggedIn)
        res.redirect('./login')
    else {
        const allCourses = await guestController.getCourses();
        res.render("corporateTrainee", {data: '', courses: allCourses})
    }
});

router.post("/add-course", async(req,res) => {
    instructorController.addCourse(req.body, req.session.username);
    const allCourses = await guestController.getCourses();
    res.render("instructor", {data: 'Success', courses: allCourses})
});

router.post("/add-exercise", async(req,res) => {
    instructorController.addExercise(req.body);
    res.render("instructor", {data: 'Exercise added successfully'})
});

router.post("/add-question", async(req,res) => {
    instructorController.addQuestion(req.body);
    res.render("instructor", {data: 'question added successfully'})
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

