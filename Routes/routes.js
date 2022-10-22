var express = require("express");

var router = express.Router();

router.get("/", function(req,res){
    res.render("index");
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
    res.render("login");
});

module.exports = router

