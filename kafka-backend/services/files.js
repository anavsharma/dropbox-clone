var User    = require('./models/User');
var glob = require('glob');


function handle_Get_Files(msg, callback){

    console.log("In handle request for Get Files:"+ JSON.stringify(msg));

    const username = msg.username;

    var folderPath = "./services/UserFiles/"+username+"/*.*" ;
    console.log(folderPath);
    var res = {};
     glob(folderPath, function (er, files) {
         console.log("inside glob");
        res.files = files.map(function (file) {
            var imgJSON = {};
           imgJSON.img =file.split('/')[4];
            imgJSON.cols = 2  ;
            return imgJSON;
        });

        console.log(JSON.stringify(res.files))
        console.log("After the files are read")
        if(er){
            res.code = "401";
            console.log("inside erro");

        }
        else{
            res.code = "200";
        }callback(null ,res);


  });
}

exports.handle_Get_Files = handle_Get_Files;

