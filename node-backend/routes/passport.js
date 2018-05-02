var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var first = "User";
var second = "Table";
var table = first+'_'+second;
var User    = require('../models/User');
var kafka = require('./kafka/client');



module.exports = function(passport) {

    passport.use('login', new LocalStrategy(function (username, password, done) {

        const uname = username;
        const pswd = password;

        console.log('in passport');
        kafka.make_request('login',{"username":username,"password":password},'passport', function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                done(err,{});
            }
            else
            {
                if(results.code == 200){
                    done(null,{username:uname,password:pswd});
                }
                else {
                    done(null,false);
                }
            }
        });
    }));
}





