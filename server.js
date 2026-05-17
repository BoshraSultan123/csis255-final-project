

// modules imported into server.js --> assigned value to var with require()
// name variable after mosule. underscore is used 
const http = require("http");

// imports the underscore.js library and stores it in the variable "_"
// underscore provides helper functions for arrays, objects, and lists
const _ = require("underscore");

http.createServer(function(request,response){
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<h1>Hello world</h1>");
    response.end();
}).listen(3000)

console.log("Listening on port 3000...");