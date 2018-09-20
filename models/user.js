var mongoose = require('mongoose');
var config = require('../config/default.json');
var assert = require('assert');
mongoose.connect(config.mongodb, function(err,db){
  assert.equal(null, err);
  console.log("Successfully connected to MongoDB user.");

});

//var conn1 = mongoose.createConnection(config.mongodbReleaseNotes);


var Schema = mongoose.Schema;


var UserSchema = new Schema({
  userid: {type: String, required: true},
  fname: {type: Date, required: true},
  lname: {type: String, required: true},
  role: {type:String, required:true},
  createdDate: {type:String, required: true},
  createdBy: {type: Date, required: true},
  modifiedDate: {type: String, required: true},
  modifiedBy: {type: Date, required: true},
});

//Export model
module.exports = mongoose.model('User', UserSchema);
