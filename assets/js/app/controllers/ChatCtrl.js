BloggyApp.controller('ChatCtrl', ['$scope', function($scope){

  $scope.messages = [];
  $scope.user = false;

  var scrollChat = function() {
    $scope.$evalAsync(function(){
      var chatView = document.querySelector('.chat-window .chat-list');
      chatView.scrollTop = chatView.scrollHeight+999;
    });
  }

  $scope.joinRoom = function() {
    if(!$scope.name){
      alert('ENTER YOUR NAME!!!@@!!');
      return;
    }

    $scope.user = $scope.name;
    io.socket.post('/api/chat/join',{user:$scope.user},function(data, jwRes){
      $scope.$evalAsync(function(){
        $scope.messages = data
      });
    });
  }

  $scope.sendMsg = function(){
    var data = {msg:$scope.chatMsg, from:$scope.user};
    io.socket.post('/api/chat/post', data, function(data, jwRes){
      console.log('posted data!!',data);
      $scope.$evalAsync(function(){
        $scope.chatMsg='';
      });
    });
  }

  //userjoin  userleave  addchat
  io.socket.on('userjoin',function(msg){
    $scope.$evalAsync(function(){
      $scope.messages.push({from:'SYSTEM',msg: msg.user + ' is ready to rock.'})
      scrollChat();
    });
  });

  io.socket.on('userleave',function(msg){
    $scope.$evalAsync(function(){
      $scope.messages.push({from:'SYSTEM',msg: msg.user + ' is audi 5000.'})
      scrollChat();
    });
  });

  io.socket.on('addchat',function(msg){
    $scope.$evalAsync(function(){
      $scope.messages.push(msg);
      scrollChat();
    });
  });

}]);