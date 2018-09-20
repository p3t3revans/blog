var express = require('express');
var router = express.Router();
var path = require('path')

//var authorization_controller = require('../controllers/authorizationController');
var post_controller = require('../controllers/posts');

router.get('/posts', post_controller.posts_list);
router.get('/posts/page/:page/:size/', post_controller.posts_list);
router.get('/posts/:id', post_controller.post_detail);
router.put('/posts/comment/:id',post_controller.post_add_comment);
router.post('/posts/create',post_controller.post_create);
router.put('/posts/like/:id',post_controller.post_like);
router.put('/posts/like/:id/:commentId',post_controller.post_like_comment);
router.put('/posts/dislike/:id',post_controller.post_dislike);
router.put('/posts/dislike/:id/:commentId',post_controller.post_dislike_comment);
//router.get('/api/search/items/:keywords', authorization_controller.roleAuthorization(['admin','user','guest']), search_controller.searchDocumentItems);
//router.get('/api/search/deep/:keywords', authorization_controller.roleAuthorization(['admin','user','guest']), search_controller.deepSearch);
//router.get('/api/search/agg/:keywords', authorization_controller.roleAuthorization(['admin','user','guest']), search_controller.deepSearchAgg);

//router.get('/search/:keywords', search_controller.searchResults);

module.exports = router;