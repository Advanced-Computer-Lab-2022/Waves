var express = require("express");

var router = express.Router();

router.get("/", function(req,res){
    console.log("Start Page");
});

module.exports = router