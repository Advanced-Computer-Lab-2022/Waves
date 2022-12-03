var Administrator=require("../models/users/Administrator"); 
var CorporateTrainee=require("../models/users/CorporateTrainee");
var Instructor=require("../models/Instructor"); 
const nodemailer=require('nodemailer')

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

async function sendEmail (email){
    // Step 1
    let transporter=nodemailer.createTransport({
    service: "gmail",
    user: "smtp.gmail.com",
    port:465,
    secure: true,
    auth: {
        type:"login",
        user: 'alienlearning8@gmail.com',
        pass: 'AlienLearning123#'
    }
    });
    // Step 2
    let mailOptions = {
    from: 'alienlearning8@gmail.com',
    to: email,
    subject: 'Reset Password',
    text: 'password reset!!'
    };

    // Step 3
    transporter.sendMail (mailOptions, function(err, data) {
    if (err) {
        console.log('ErrorOccurs: ', err);
    } else {
        console.log('Email sent!!!!');
    }
    });        
}


module.exports = {addAdmin, addCorporate, addInstructor, sendEmail};