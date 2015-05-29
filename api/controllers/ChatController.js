/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var chatlog = [{from:'System',msg:'this is the first message'}];

module.exports = {

  //req.body.user
	join: function(req, res) {

    sails.sockets.broadcast('mychatroom','userjoin',{user:req.body.user});
    req.socket.on('disconnect',function(){
      sails.sockets.broadcast('mychatroom','userleave',{user:req.body.user});
    });

    sails.sockets.join(req.socket, 'mychatroom');
    res.send(chatlog);
  },

  //req.body.from  req.body.msg
  post: function(req, res) {
    var msg = {from: req.body.from, msg: req.body.msg};
    chatlog.push(msg);
    sails.sockets.broadcast('mychatroom','addchat',msg);
    res.send({result:true});
  }

};

