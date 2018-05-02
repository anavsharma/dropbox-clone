var User    = require('./models/User');



function handle_Login_request(msg, callback){

    console.log("In handle request:"+ JSON.stringify(msg));

    User.findOne({username: msg.username, password: msg.password}, function (err, user) {
        var res = {};
        if (user) {
            console.log("inside valid user");
            res.code = "200";
            res.value = "Success Login";

        }
        else {
            console.log("Inside the error thingy");
            res.code = "401";
            res.value = "Failed Login";

        }callback(null, res);

    });

}


function handle_Validate_request(msg,callback) {
    console.log("Inside validate username function" + JSON.stringify(msg));


    User.findOne({username:msg.username}, function (err,user) {
        var res = {};
        if(user){
            console.log("User is valid ");
            res.code = "200";
            res.value = "success validation";

        }
        else{
            console.log("Inside the error for validation");
            res.code = "401";
            res.value = "Failed Validation";
        }callback(null,res);
    })

}

exports.handle_Login_request = handle_Login_request;
exports.handle_Validate_request = handle_Validate_request ;