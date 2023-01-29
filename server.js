const express = require("express")
const busboy = require("busboy");
const {random} = require("./lib/random")
const fs = require("fs");
const path = require("path");


//create server
const server = express();

//middleware for serving static file
// if you open browser you can view html files in pages
server.use(express.static("pages"));

//serving boostrap static files
server.use(express.static("public"));

// path to listen to post requests
server.post("/uploads",(req,res)=>{
    const bb = busboy({headers: req.headers})
    //add eventlistener for files incomming
    bb.on("file",(name, file, info)=>{
        // name is the field name from front-end
        // file is a stream of the incomming file we want
        // info contains other information about the file. read more on that
        const {filename, encoding, mimeType} = info;
        console.log("saving file: [%s] filename [%s] encoding [%s] mimetype [%s]",name, filename, encoding, mimeType);
        

        // create a temporary file
        const saveFile = random();
        //create a writable stream
        const writeSream = fs.createWriteStream(path.join("uploads",saveFile)+ filename);

        file.pipe(writeSream);

        
    })
    // listen for field events
    bb.on("field",(name,value,info)=>{
        console.log("name [%s] value [%s]", name, value);
    })
    // listen for close event
    bb.on("close",()=>{
        res.send("Uploaded file successfully")
    })



    //step: 1 pipe request to busboy
     req.pipe(bb);
})



//set server to listen to port 6000
server.listen(3000,()=>{
    console.log("Server running");
})