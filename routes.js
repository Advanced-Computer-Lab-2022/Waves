var express = require("express");

var router = express.Router();

router.get("/", function(req,res){
    res.render("index");
});

router.post("/sign-up", function(req,res){
    res.render("sign_up");
});

router.post("/login", function(req,res){
    res.render("login");
});


module.exports = router