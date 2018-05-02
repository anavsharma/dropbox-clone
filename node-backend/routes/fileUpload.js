var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');
var fs = require('fs');
var kafka = require('./kafka/client');
var fileName ;
var filePath ;
var rimraf = require('rimraf');
var User = require('../models/User');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {

      const username ="./UserFiles/"+req.session.username;

        cb(null,username);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({storage:storage});

router.post('/upload', upload.single('mypic'),function (req, res, next) {
    var username = req.session.username ;
    req.file.starred = true ;
    console.log(req.file);
    kafka.make_request('fileUpload',{file:req.file,username:username},'fileUpload', function(err,results){
        if(err){
          console.log(err);
        }
        else
        {

            if(results.code==='200'){
                res.status(201).send();
            }
            else{
                res.status(401).send();
            }
        }
    });
   
});

router.get('/check', function(req,res){
     var username = req.session.username ;
      if(req.session.loggedin=== true){
         const username = req.session.user;
         res.status(201).send();
     }

    else{
        console.log("return nothing")
        res.status(401).send();
    }

});

router.post('/uploadFolder' , function (req,res) {

    var username = req.session.username ;
    var folderpath = req.body.folder ;

    fs.mkdir(folderpath, function(err) {
             if (!err) {

                 kafka.make_request('uploadFolder',{folder:folderpath,username:username},'folderUpload', function(err,results){
                     if(err){
                      console.log(err);
                     }
                     else
                     {

                         if(results.code==='200'){
                             res.status(201).send();
                         }
                         else{
                             res.status(401).send();
                         }
                     }
                 });

             }
             else {
                    return res.end("Dir creation failed : " + err);
                    res.status(401).send();
                  }
      });

})


router.post('/delete' , function (req,res) {
    console.log("inside Delete");
    var username = req.session.username;
    fs.unlink(req.body.path, function(err) {
        if (!err) {
              console.log("File deleteing");

            kafka.make_request('deleteFile',{file:req.body,username:username},'filedelete', function(err,results){
                console.log('response from kafka for user validation');
                console.log(results);
                if(err){
                    console.log(err);
                }
                else
                {

                    if(results.code==='200'){
                        res.status(201).send();
                    }
                    else{
                        res.status(401).send();
                    }
                }
            });
        }
        else {
            kafka.make_request('deleteFile',{file:req.body,username:username},'filedelete', function(err,results){
                if(err){
                    console.log(err);
                }
                else
                {

                    if(results.code==='200'){
                        res.status(201).send();
                    }
                    else{
                        res.status(401).send();
                    }
                }
            });


        }
    });
})


router.post('/share' , function(req,res){
    console.log("inside file sharing");
    var filePathOriginal = './'+req.body.img ;
    console.log(filePathOriginal);
    var destDirectory = './UserFiles/'+req.body.shareUsername ;
    var fileName = req.body.img.split('/')[2]
    var filePathDestination = destDirectory +'/'+ fileName ;
    console.log(filePathDestination);
    fs.access(destDirectory, function(err){
        if(err) {
            res.status(401).send(err);
        }
        else{
            const readStream = fs.createReadStream(filePathOriginal);
            readStream.once('error', function(err){
              console.log(err);
        });

            readStream.once('end', function() {
                console.log('done copying');
        });

            readStream.pipe(fs.createWriteStream(filePathDestination));
            res.status(201).send("this is awesome")

        }
    })

})



router.post('/deleteFolder' , function(req,res){

    console.log(req.body.folderpath);
    var folderpath = req.body.folder;
    var username = "anav";
    rimraf(folderpath , function (err) {

            if (!err) {
                kafka.make_request('deleteFolder',{folder:folderpath,username:username},'deleteFolder', function(err,results){
                    if(err){
                        console.log(err);
                    }
                    else
                    {

                        if(results.code==='200'){
                            res.status(201).send("directory deleted");
                        }
                        else{
                            res.status(401).send("unable to delete from the database");
                        }
                    }
                });

            }
            else {

                res.status(401).send("deletion from the serverfailed");
            }



    })
})

module.exports = router;