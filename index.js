const http = require('http')
const fs = require('fs')
const express= require('express')
const multer = require('multer')
const csv = require('fast-csv')
var process= require('process')

const Router = express.Router;

console.log("packages imported successfully")

const upload = multer ({dest : 'tmp/csv'});
const app = express();
const router = new Router();
const server = http.createServer(app);
const port = 3000;


router.get('/',(req,res)=>{
    console.log("Inside get route")
    res.send("Goodddddddddddddddddddddddddddddddddd");
})
router.post ('/',upload.single('file'),(req,res)=>{
    console.log("Hello world ");
    console .log(process.pid);
    const fileRows = [];

    // open uploaded file
    csv.parseFile(req.file.path)
      .on("data", function (data) {
        fileRows.push(data); // push each row
      })
      .on("end", function () {
          console.log("UNLINK CALLED");
        //console.log(fileRows)
        fs.unlinkSync(req.file.path);   // remove temp file
        //process "fileRows" and respond
      })
      res.send("File transfer successful");
})
router.get('/pause',(req,res)=>{
    res.send("Transfer Has Been Paused");
})
router.get('/continue',(req,res)=>{
    res.send("Continuing file transfer from the place it was stopped");
})

router.get('/stop',(req,res)=>{
    res.send("Stopping file transfer and rolling back to initial state");
})





app.use('/upload-csv',router);

function startServer(){
    server.listen(port)
}

server.listen(port);
//setImmediate(startServer);