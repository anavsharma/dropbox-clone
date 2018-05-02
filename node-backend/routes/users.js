var express = require('express');
var router = express.Router();

var home = require('./home');

router.post('/doRegister', home.afterRegister);

router.post('/doLogout' , home.logout);

router.post('/login', home.loginPassport);

router.get('/getFiles',home.getFiles);

router.post('/validateUser' , home.validateUser);

router.get('/groups' , home.getGroups);

router.post('/createGroup' , home.createGroup);

router.post('/addMember' , home.addMember);

router.post('/deleteGroup',home.deleteGroup)

module.exports = router;