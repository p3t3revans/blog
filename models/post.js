var mongoose = require('mongoose');
var config = require('../config/default.json');
var assert = require('assert');
mongoose.connect(config.mongodb, function(err,db){
    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

});


var Schema = mongoose.Schema;

var Comment = require('./comment');

var PostSchema = new Schema({
    //_id : {type: String},
    title : {type: String, required:true},
    author : {type: String},
    content: {type: String},
    comments: [Comment.schema],
    createDate: {type: Date},
    likes:{type:Number,default:0},
    dislikes:{type:Number,default:0}
  });

  module.exports = mongoose.model('Post', PostSchema);