var express = require("express");
var path = require("path");

var routes = require("./routes");
var app = express();

app.use(routes);
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function(){
    console.log('Server Started On Port ' + app.get('port'))
});