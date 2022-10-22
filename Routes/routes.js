var express = require("express");

var router = express.Router();

router.get("/", function(req,res){
    res.render("index");
});

router.post("/sign-up", function(req,res){
    res.render("sign_up");
});

router.post('/register', async(req, res) => {
    try {
        if(req.body.username == '' || req.body.password == '')
        res.render('sign_up', {
            err: "Please fill both the username and password blanks!"
        })
        else {
            const MongoClient = require('mongodb').MongoClient;
            const uri =   `mongodb+srv://Adam2431:Waves2431@waves.0kjx7bl.mongodb.net/test`;
            const client = new MongoClient(uri, { useNewUrlParser: true });
            await client.connect();
            const newUser = new individualTrainee ({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                first: req.body.first,
                last: req.body.last,

            })
            await client.db('Online-Learning-System').collection('Individual Trainee').insertOne(newUser)
            client.close()
            res.redirect('/login')
        }
    } catch (error) {
        if(error.code == 11000) {
            res.render('sign_up', {
                err: "This Username is already taken!"
            })
        } else
        res.render('sign_up', {
            err: "Invalid Username Or Password!"
        })
    }
})

router.post("/login", function(req,res){
    res.render("login");
});


module.exports = router

