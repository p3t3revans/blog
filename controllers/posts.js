var Post = require('../models/post');
var Comment = require('../models/comment');
var htmlDecode = require('js-htmlencode').htmlDecode;
var htmlEncode = require('js-htmlencode').htmlEncode;
var mongoose = require('mongoose');

const async = require('async');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// // Display list of all Helps
exports.posts_list = function (req, res, next) {

  Post.countDocuments({}, function (err, count) {
    if (err) return (err);
    Post.find().sort({ "createDate": -1 }).limit(Number(req.params.size)).skip(Number(req.params.size) * Number(req.params.page)).exec()
      .then((list_posts) => {
        res.setHeader('X-InlineCount', count);
        res.status(200).send(list_posts);
      }
      ).catch(err => {
        return next(err);
      });
  }

  );


};
exports.post_add_comment = function (req, res, next) {
  let status = false;

  var id = mongoose.Types.ObjectId(req.params.id);
  var comment = new Comment(
    {

      text: req.body.text,
      createUser: req.session.userid,
      commentDate: Date(Date.now())
    });
  Post.findByIdAndUpdate(id,
    { $push: { comments: comment } },
    { safe: true, upsert: true },
    function (err, doc) {
      if (err) {
        console.log(err);
        return res.json({'status':status});
      }
      else {
        //console.log("comment inserted");
        status = true;
        return res.json({'status':status});
      }
    }
  )

}
exports.post_like = function (req, res, next) {
  let status = false;

  var id = mongoose.Types.ObjectId(req.params.id);
  Post.findOneAndUpdate(
    {_id:id},
    { $inc: { likes: 1 } },
    { safe: true, upsert: true },
    function (err, doc) {
      if (err) {
        console.log(err);
        return res.json({'status':status});
      }
      else {
        status = true;
        return res.json({'status':status});
      }
    }
  )

}
exports.post_dislike = function (req, res, next) {
  let status = false;

  var id = mongoose.Types.ObjectId(req.params.id);
  Post.findOneAndUpdate(
    {_id:id},
    { $inc: { dislikes: 1 } },
    { safe: true, upsert: true },
    function (err, doc) {
      if (err) {
        console.log(err);
        return res.json({'status':status});
      }
      else {
        status = true;
        return res.json({'status':status});
      }
    }
  )

}

exports.post_like_comment = function (req, res, next) {
  let status = false;

  var id = mongoose.Types.ObjectId(req.params.id);
  var commentId = mongoose.Types.ObjectId(req.params.commentId);
  Post.update(
    {'comments._id':commentId},
    { $inc: { 'comments.$.likes': 1 } },
    { safe: true, upsert: true },
    function (err, doc) {
      if (err) {
        console.log(err);
        return res.json({'status':status});
      }
      else {
        status = true;
        return res.json({'status':status});
      }
    }
  )

}
exports.post_dislike_comment = function (req, res, next) {
  let status = false;

  var id = mongoose.Types.ObjectId(req.params.id);
  var commentId = mongoose.Types.ObjectId(req.params.commentId);
  Post.update(
    {'comments._id':commentId},
    { $inc: { 'comments.$.dislikes': 1 } },
    { safe: true, upsert: true },
    function (err, doc) {
      if (err) {
        console.log(err);
        return res.json({'status':status});
      }
      else {
        status = true;
        return res.json({'status':status});
      }
    }
  )

}
// Handle DocumentItem create on POST 
exports.post_create = function (req, res, next) {

  //req.checkBody('title', 'Title must be specified.').notEmpty();
  //req.checkBody('content','Content must be specified').notEmpty();

  //req.sanitize('content').escape();
  //req.sanitize('keywords').escape();

  //var errors = req.validationErrors();
  //if (errors) {
  //  return res.status(500).send(errors);
  //}
  var post = new Post(
    {

      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      createDate: req.body.createDate
    });

  post.save(function (err) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(post);
  });
}
exports.post_detail = function (req, res, next) {

  var id = mongoose.Types.ObjectId(req.params.id);
  Post.findById(id).exec()
    .then((post) => {
      res.status(200).send(decodePostForViewing(post));
    }
    ).catch(err => {
      return next(err);
    });
  //var id = req.params.id;
  /* var result = {};
  getPost(id)
    .then(result => {
      return res.status(200).send(result);
    }).catch(error => {
      return res.status(500).send(error);
    }); */
}
const getPost = async postId => {
  var post = await Post.findOne({ "_id": postId }).exec();
  return post;
}

const getPostsCount = async function () {
  var count = await Post.count();
  return count;
}

const decodePostForViewing = post => {   
  post.title = htmlDecode(post.title ? post.title : "");
  post.content = htmlDecode(post.content ? post.content : "");
  return post;
}

// Display detail page for a specific post
/* exports.document_detail = function(req, res, next) {
   
    var id = req.params.id;
    var result = {};
    getDocument(id)
    .then(result=>{
      return res.status(200).send(result);
    }).catch(error=>{
      return res.status(500).send(error);
    });
} */

// Handle Help update on PUT
/* exports.document_update_put = function(req, res, next) {
  var id = mongoose.Types.ObjectId(req.params.id);
  // Sanitize fields
  req.checkBody('title', 'Title must be specified.').notEmpty();
  req.sanitize('contact').escape();
  //req.sanitize('chapters').escape();
  
  // Extract the validation errors from a request 
  const errors = req.validationErrors();

  if (errors) {
    res.status(500).send(errors);
    return;
  }
 */
  // Create a Release object with escaped/trimmed data and old id.
 /*  var document = new Document(
  {
      title: req.body.title,
      keywords: req.body.keywords,
      is_show_toc: req.body.is_show_toc,
      classification: req.body.classification,
      contact: req.body.contact,
      chapters : processAndSanitizeChapters(req.body.chapters),
      is_visible: req.body.is_visible,
      created_date: new Date(),
      modified_by: req.connection.user,
      modified_date: new Date(),
      _id:req.params.id //This is required, or a new ID will be assigned!
  });
  Document.updateOne({"_id":document._id},document,{upsert:true}, function(err, doc){
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(decodeDocumentForViewing(document));
  });
} */

// Display Help delete form on GET
/* exports.document_delete_get = function(req, res, next) {       
  
  Document.findByIdAndRemove(req.params.id,function(err,doc){
    if (err) { return res.status(500).send(err)}
    res.status(200).send(doc);
  });
}

exports.document_updatesort = function(req, res, next) {
  var sortKeys = req.body;
  Document.find()
    .exec((err,documents) => {
    if (err) {return next(err);}
    async.each(documents, function(document, callback) {
      
      var item = sortKeys.find(x=> {
        return (x._id == document._id);
      });
      document.order = item.order;
      try {
        document.save(callback);  
      } catch (error) {
        callback(error,null);
      }
    }, function(err,doc){
      if (err) return res.status(500).send(err);
      return res.status(200).send();
    });
  });

  
  Document.find({"document_id":documentId}, function(err,documents){
    if (err) {
      return res.status(500).send(err);
    }
    
  });
}

exports.document_chapters_put = (req, res, next) => {
  var chapters = req.body.chapters;

  if (chapters == null) return res.status(200).send(req.body);

  chapters = processAndSanitizeChapters(chapters);
  var document = {};
  getDocument(req.params.id)
  .then(document=>{
    document.chapters = chapters;
    document.save()
    .then(data => {
      return res.status(200).send(decodeDocumentForViewing(data));
    });
  })
  .catch(error=> {
    return res.status(500).send(error);
  });
}

const getDocument = async docId => {
    var document = await Document.findById(docId).exec();
    document = decodeDocumentForViewing(document);
    return document;  
}

const processAndSanitizeChapters = (chapters) => {
  chapters.forEach(chapter => {
    if (chapter._id == null) {
      chapter._id = mongoose.Types.ObjectId();
      
    };
    chapter.content = chapter.content ? htmlEncode(chapter.content) : "";
  });
  return chapters;
}

const decodeDocumentForViewing = document => {
  document.chapters.forEach(chapter => {
    chapter.content = htmlDecode(chapter.content?chapter.content:"");
  });
  document.contact = htmlDecode(document.contact ? document.contact : "");
  return document;
} */