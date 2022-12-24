require('dotenv').config();
const cors = require("cors");
const express = require("express");
const path = require("path");
const routes = require("./Routes/routes");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const session = require('express-session');
//const { Mongoose } = require("mongoose/lib");

console.log(process.env.ATLAS_URI);
mongoose.connect(process.env.ATLAS_URI);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.urlencoded());


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

app.use(routes);
app.listen(port, () => {
  console.log('listening on port ' + port)
})
