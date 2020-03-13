const http = require('http')
const fs = require('fs')

const multer = require('multer')
const express= require('express')
const csv = require('fast-csv')
var process= require('process')
var uuid = require('node-uuid');
const app=express();

const Router = express.Router;


const router = new Router();

const upload = multer ({dest : 'tmp/csv'});

router.get('/',(req,res)=>{
    console.log("Inside get route")
    res.send("Goodddddddddddddddddddddddddddddddddd");
})
router.post ('/',upload.single('file'),(req,res)=>{
    console.log("Hello world ");
   // console .log(process.pid);
    const fileRows = [];
  //  console.log(logger.info);
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


module.exports= router