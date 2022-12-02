var express = require("express");
var instructorController = require("../controller/InstructorController");
var adminController = require("../controller/AdminController");
var guestController = require("../controller/GuestController");
var individualTrainee = require("../controller/IndividualTraineeController");
var IndividualTrainee = require("../models/IndividualTrainee"); 
var Administrator = require("../models/Users/Administrator"); 
var CircularJSON = require('circular-json')
const Instructor=require("../models/Instructor");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const createError = require('http-errors')

var router = express.Router();

router.get("/", async (req,res) => {
    if(req.session.user == "admin"){
        res.send("/admin")
    }
    else if(req.session.user == "individual"){
        res.send("/individual")
    }
    else if(req.session.user == "corporate"){
        res.send("/corporateTrainee")
    }
    else if(req.session.user == "instructor"){
        res.send("/instructor")
    }
    else{
        const allCourses = await guestController.getCourses();
        res.render("home", {data: '', courses: allCourses})
    }
});

router.get('/inbox', async(req, res) => {
    console.log(await guestController.getInbox('admin'))
    res.send(await guestController.getInbox('admin'))
})

router.get("/sign-up", function(req,res){
    res.render("sign_up", {err:"", succ:""});
});

router.get("/terms", function(req,res){
    res.render("terms");
});

router.get("/admin", async(req,res) => {
    // if(!req.session.isLoggedIn)
    //     res.redirect('./login')
    // else {
        const allCourses = await guestController.getCourses();
        console.log(JSON.stringify(allCourses))
        res.send(JSON.stringify(allCourses))
   // }
});

// router.get("/login", function(req,res){
//     res.render("login", {
//         err: ''
//     })
// });

router.post("/sign-up", async(req,res) => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = await userModel.create({ name: name, email: email, password: hashedPassword });
        const token = createToken(user.name);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

router.post("/login", async(req,res) => {
    const{username, password} = req.body;
    console.log(password + " xxx")
    try {
        const user = await Instructor.findOne({username : "Instructor"}).exec()
        console.log(user + "************")
        if(user){
            const flag=await bcrypt.compare("Instructor",user.password);
            if(flag){
                const token=createToken(user.username);
                res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge*1000});
                res.status(200).json(user);      
            }else {
                res.status(404).json({error: "Not the same"});
            }
        }else{
            res.status(404).json({error: "User not found"})
        }
    } catch (error){
        res.status(400).json({error: error.message});
    }
});

router.get("/logout", async(req,res) => {
    return res.clearCookie("jwt").status(200).json({ message: "Successfully logged out" });
});


// router.post("/logout", function(req,res){
//     req.session.username = null
//     req.session.password = null
//     req.session.isLoggedIn = null
//     req.session.user = null
//     res.redirect("/")
// });

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
        if(req.body.showMyCourses)
            //res.render("instructor", {data: '', courses: myFilteredCourses})
            res.send(filteredCourses)
        else
            res.render("instructor", {data: '', courses: filteredCourses})
    }
});

router.post("/add-user", async(req,res) => {
    const str = CircularJSON.stringify(req);
    //console.log(JSON.parse(str).body.index)
    var index=JSON.parse(str).body.index
    if(index==0) adminController.addAdmin(JSON.parse(str).body);
    else if(index==1) adminController.addInstructor(JSON.parse(str).body);
    else if(index==2) adminController.addCorporate(JSON.parse(str).body);
    //adminController.addAdmin(JSON.parse(str).body);
    //res.send("/admin")
});

// router.post("/add-exam", async(req,res) => {
//         const str = CircularJSON.stringify(req);
//         console.log(JSON.parse(str))
//         instructorController.addExam(JSON.parse(str).body);
//         instructorController.addQuestionToExam(JSON.parse(str).body);
//         res.send("/instructor")
//     });

// router.post("/add-instructor", async(req,res) => {
//     adminController.addInstructor(req.body);
//     const allCourses = await guestController.getCourses();
//     res.render("admin", {data: 'Success!', courses: allCourses})
// });

// router.post("/add-trainee", async(req,res) => {
//     adminController.addCorporate(req.body);
//     const allCourses = await guestController.getCourses();
//     res.render("admin", {data: 'Success!', courses: allCourses})
// });

router.get("/instructor", async(req,res) => {
    // if(!req.session.isLoggedIn)
    //     res.redirect('./login')
    // else {
        const allCourses = await guestController.getCourses();
        res.render("instructor", {data: '', courses: allCourses})
    //}
});

router.get("/individual", async(req,res) => {
    if(!req.session.isLoggedIn)
        res.redirect('./login')
    else {
        const allCourses = await guestController.getCourses();
        res.render("individualTrainee", {data: '', courses: allCourses})
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
    const str = CircularJSON.stringify(req);
    //console.log(JSON.parse(str))
    instructorController.addCourse(JSON.parse(str).body);
    res.send("/instructor")
});

router.post("/add-exam", async(req,res) => {
    const str = CircularJSON.stringify(req);
    console.log(JSON.parse(str))
    instructorController.addExam(JSON.parse(str).body);
    instructorController.addQuestionToExam(JSON.parse(str).body);
    res.send("/instructor")
});

router.get("/exams", async(req,res) => {
    // const allCourses = await guestController.getCourses();
    // res.send(JSON.stringify(allCourses))
    const allExams = await individualTrainee.getExams()
    console.log(JSON.stringify(allExams))
    res.send(JSON.stringify(allExams))
});

router.post("/exam-session", async(req,res) =>{
    const str = CircularJSON.stringify(req);
    const belongsToCourse = JSON.parse(JSON.stringify(JSON.parse(str).body)).belongsToCourse;
    const name = JSON.parse(JSON.stringify(JSON.parse(str).body)).name;
    const ExamQuestions = await individualTrainee.getSpecificExam(belongsToCourse,name)
    res.send(JSON.stringify(ExamQuestions))
    //console.log((ExamQuestions))
    //console.log("work****************")
    //res.send(JSON.stringify(ExamQuestions))
});


router.get("/view-rating", async(req,res) => {
    // if(!req.session.isLoggedIn)
    //     res.redirect('./login')
    // else {
        const instructorRating = await instructorController.getMyRating("Instructor"); //should be updated with different instructors
        //console.log(instructorRating)
        res.send(JSON.stringify(instructorRating))
    //}
});
router.get("/view-instructorcourserating", async(req,res) => {
    // if(!req.session.isLoggedIn)
    //     res.redirect('./login')
    // else {
        const instructorCourseRating = await instructorController.getMyCoursesratings("Omar Ghoniem"); //should be updated with different instructors
        console.log(instructorCourseRating)
        res.send(JSON.stringify(instructorCourseRating))
    //}
});

// router.post("/add-question", async(req,res) => {
//     instructorController.addQuestionToExam(req.body);
//     res.render("instructor", {data: 'question added successfully'})
// });


router.put('/changePassword/:username', async (req,res)=>{
    if(req.body.oldPassword=="" || req.body.newPassword1=="" || req.body.newPassword2=="")
        res.send({errors:"All fields must be filled"})
    else{
      await Users.findOne({username:req.params.username}).then(async (user)=>{
        var errors="";
        var match=false;
        match=await bcrypt.compare(req.body.oldPassword,user.password);
        if(match){
            if(req.body.newPassword1!=req.body.newPassword2)
                errors="New passwords don't match";
            else if(req.body.newPassword1==req.body.oldPassword)
                errors="New password cannot be the same as old password"
            else{
                try{
                    const hashedPassword = await bcrypt.hash(req.body.newPassword1, 10);
                    user.password=hashedPassword;
                    user.save();
                    errors="Password changed successfully!";
                }
                catch{
                    res.send("oops")
                }
            }
        }
        else
            errors="Incorrect old password";
        res.send({errors:errors});
      })
    }
})


router.post('/authenticate', async(req, res) =>{
    const str = CircularJSON.stringify(req);
    const user = await guestController.authenticateUser(JSON.parse(str).body);
    console.log(user);
    if(user == "admin"){
        req.session.isLoggedIn = true;
        req.session.username = req.body.username;
        req.session.user = user;
        res.send("/admin");
    }
    else if(user == "individual"){
        req.session.isLoggedIn = true
        req.session.username = req.body.username
        req.session.user = user;
        res.send("/individual");
    }
    else if(user == "corporate"){
        req.session.isLoggedIn = true
        req.session.username = req.body.username
        req.session.user = user;
        res.send("/corporateTrainee");
    }
    else if(user == "instructor"){
        req.session.isLoggedIn = true
        req.session.username = req.body.username
        req.session.user = user;
        res.send("/instructor");
    }
    else {
        res.send("No One")
    }
});



router.post('/register', async(req, res) => {
    const newUser = new IndividualTrainee ({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        first: req.body.first,
        last: req.body.last
    })
    newUser.save(function(err) {
        if (err) {
            if(err.code == 11000) {
                res.render('sign_up', {err: "This Username is already taken!", succ: ""})
            }
            else{
                res.render('sign_up', {err: "Invalid Username Or Password!", succ: ""})
            }
        }
        else{
            res.render('sign_up', {err: "", succ: "Your Account Has Been Successfully Registered!"})
        }
    })
})

module.exports = router

