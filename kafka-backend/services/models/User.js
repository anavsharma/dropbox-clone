var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017/cmpe_273');

var userSchema   = new Schema({
    name: String,
    password: String,
    email:String,
    username:String
});

module.exports = mongoose.model('Users', userSchema);
