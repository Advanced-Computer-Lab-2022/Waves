var express = require("express");

var router = express.Router();

router.get("/Guests", function(req,res){
    res.render("guest");
});