BloggyApp.controller('HomeCtrl',['$scope','$rootScope','Post','AlertService',function($scope,$rootScope,Post,AlertService){

  $rootScope.loading = true;

  console.log('home controller loaded!');

  $scope.posts = [];

  $scope.createPost = function(){
    var post = new Post();
    post.title = "My new post title";
    post.body = "This is my new post body";
    post.$save(function(data){
      console.log(data);

      //refresh post list
      // $scope.loadPosts();
    });
  }

  $scope.showPost = function(postId){
    Post.get({id:postId},function(data){
      console.log(data);

      // data.title = "an updated title?";
      // data.$update({id:postId},function(data){
      //   console.log('it saved',data);
      // })
    });
    // Post.update({id:postId},{title:'this is my new title'},function(data){
    //   console.log('updated',data);
    // });
  }

  $scope.deletePost = function(postId){
    Post.delete({id:postId}, function(data){
      AlertService.add('info','The post was deleted.');
      // $scope.loadPosts();
    });
  }

  $scope.loadPosts = function(){

    io.socket.get('/api/post', function(data, jwRes) {
      $scope.$evalAsync(function(){
        $rootScope.loading = false;
        $scope.posts = data;
      })
    });

    // Post.query(function(data){
    //   $rootScope.loading = false;
    //   $scope.posts = data;
    // })


  }

  $scope.loadPosts();

  // $http.get('/api/post').success(function(data){
  //   console.log(data);
  //   $scope.posts = data;
  // });

  io.socket.on('post', function(msg) {
    console.log('socket msg', msg);

    if(msg && msg.verb) {
      switch(msg.verb){
        case 'created':
          $scope.$evalAsync(function(){
            $scope.posts.push(msg.data);
          });
          break;
        case 'updated':
          $scope.$evalAsync(function(){
            for(var i = 0; i < $scope.posts.length; i++){
              if($scope.posts[i].id == msg.id){
                for(var key in msg.data){
                  $scope.posts[i][key] = msg.data[key];
                }
                break;
              }
            }
          });
          break;
        case 'destroyed':
          $scope.$evalAsync(function(){
            for(var i = 0; i < $scope.posts.length; i++){
              if($scope.posts[i].id == msg.id){
                $scope.posts.splice(i,1);
                break;
              }
            }
          });
          break;
      }
    }
  });

}]);