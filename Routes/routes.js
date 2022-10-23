var express = require("express");

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

module.exports = router

