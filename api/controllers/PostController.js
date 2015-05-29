/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  addComment: function(req, res) {

    if(req.session.user){
      Comment.create({
        body:req.body.body,
        post:req.params.postId,
        user:req.session.user.id
      }).then(function(data) {
        Post.findOne({id:req.params.postId}).populateAll().then(function(post){
          res.send(post);
        });
      });
    }else{
      res.send(403,'You must be logged in!!');
    }

  }

};

