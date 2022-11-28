var Administrator=require("../models/users/Administrator"); 
var CorporateTrainee=require("../models/users/CorporateTrainee");
var Instructor=require("../models/Instructor"); 

function addAdmin (body){
    const newAdmin =new Administrator({
        username: body.username,
        password: body.password,
        inbox: []
    });
    newAdmin.save();
}

function addCorporate (body){
    const newCorporate =new CorporateTrainee({
        username: body.username,
        password: body.password,
        inbox: []
    });
    newCorporate.save();
}

function addInstructor (body){
    const newInstructor =new Instructor({
        username: body.username,
        password: body.password,
        inbox: []
    });
    newInstructor.save();
}



module.exports = {addAdmin, addCorporate, addInstructor};