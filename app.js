require('dotenv').config();
var cors = require("cors");
var express = require("express");
var path = require("path");
var routes = require("./Routes/routes");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser')
var session = require('express-session');
//const { Mongoose } = require("mongoose/lib");

console.log(process.env.ATLAS_URI);
mongoose.connect(process.env.ATLAS_URI);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(session({
  secret: 'keyboard cat',
  // resave: false,
  // saveUninitialized: true,
  // cookie: { maxAge: 24 * 60 * 60 * 1000 }
  // cookie: { secure: false }
}))

const port = 3001
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}))



app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(routes);
app.listen(port, () => {
  console.log('listening on port ' + port)
})
