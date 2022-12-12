const Administrator=require("../models/users/Administrator"); 
const CorporateTrainee=require("../models/users/CorporateTrainee");
const Instructor=require("../models/users/Instructor"); 
const nodemailer=require('nodemailer')

function addAdmin (body){
    const newAdmin =new Administrator({
        username: body.username,
        password: body.password,
        profilePic: 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
    });
    newAdmin.save();
}

function addCorporate (body){
    const newCorporate =new CorporateTrainee({
        username: body.username,
        password: body.password,
        profilePic: 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
    });
    newCorporate.save();
}

function addInstructor (body){
    const newInstructor =new Instructor({
        username: body.username,
        password: body.password,
        profilePic: 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
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
        pass: 'gzwqfqhlcodrldze'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    },
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