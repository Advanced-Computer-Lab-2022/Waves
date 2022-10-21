var express = require("express");

var router = express.Router();

router.get("/Guests", function(req,res){
    console.log("Guest Page");
    //res.render("guest");
});