const http = require('http')
const fs = require('fs')
const express= require('express')
const csv = require('fast-csv')
var process= require('process')
var uuid = require('node-uuid');
var httpContext = require('express-http-context');
var express_logger = require("express-logger-unique-req-id");

const router=require('./routes');


const app = express();
const server = http.createServer(app);
const port = 3000;




express_logger.initializeLogger(app);
let logger = express_logger.getLogger();

logger.debug("First message");


app.use('/upload-csv',router);

server.listen(port,()=>{
    console.log("Server Running at port ",port);
});
//setImmediate(startServer);