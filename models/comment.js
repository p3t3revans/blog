var mongoose = require('mongoose');
var config = require('../config/default.json');
mongoose.connect(config.mongodb);

var Schema = mongoose.Schema;


var CommentSchema = new Schema({
    text : {type: String, required:true},
    createUser : {type: String},
    commentDate: {type: Date},
    likes:{type:Number,default:0},
    dislikes:{type:Number,default:0}
  });

  module.exports = mongoose.model('Comment', CommentSchema);