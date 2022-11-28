require('dotenv').config();
let express = require("express");
let path = require("path");
let routes = require("./Routes/routes");
let app = express();
let mongoose = require("mongoose");
let bodyParser = require('body-parser')
let session = require('express-session')
let cors = require('cors')
//const { Mongoose } = require("mongoose/lib");

console.log(process.env.ATLAS_URI);
mongoose.connect(process.env.ATLAS_URI);

app.use(bodyParser.urlencoded({
  extended: true
}));


let port=3001
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(cors())


app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(routes);
app.listen(port, () => {
    console.log('listening on port '+port)
  })