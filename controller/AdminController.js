var Administrator=require("../models/users/Administrator"); 
var CorporateTrainee=require("../models/users/CorporateTrainee");
var Instructor=require("../models/Instructor"); 

function addAdmin (body){
    const newAdmin =new Administrator({
        username: body.username,
        password: body.password,
    });
    newAdmin.save();
}

function addCorporate (body){
    const newCorporate =new CorporateTrainee({
        username: body.username,
        password: body.password,
    });
    newCorporate.save();
}

function addInstructor (body){
    const newInstructor =new Instructor({
        username: body.username,
        password: body.password,
    });
    newInstructor.save();
}



module.exports = {addAdmin, addCorporate, addInstructor};