var express = require("express");
const instructorController = require("../controller/InstructorController");

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

router.get("/getCourses", async(req,res) => {
    const get=await instructorController.getCourses()
    console.log(get)
    res.json(get);
});
    // await client.db('Online-Learning-System').collection('Courses').insertOne(newCourse)
    // client.close()}
    //res.render("guest");


// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

module.exports = router

