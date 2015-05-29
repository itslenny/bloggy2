BloggyApp.controller('PostShowCtrl',['$scope','$rootScope','Post','AlertService','$routeParams','PostComment','UserService',function($scope,$rootScope,Post,AlertService,$routeParams,PostComment,UserService){

  $scope.UserService = UserService;

  $scope.$watchCollection('UserService',function(){
    $scope.currentUser = UserService.currentUser;
  });


  $rootScope.loading = true;
  // console.log('post show controller loaded.',$routeParams)

  Post.get({id:$routeParams.id},function(data) {
    $rootScope.loading = false;
    console.log(data);
    $scope.post = data;
  },function(err){
    console.log(err);
  });

  $scope.addComment = function() {
    // alert('add a comment: ' + $scope.commentText);

    // PostComment.create({postId:$scope.post.id},{body:$scope.commentText},function(data){
    //   $scope.post = data;
    //   $scope.commentText = '';
    // });

    var comment = new PostComment();
    comment.body = $scope.commentText;
    comment.$save({postId:$scope.post.id}, function(data) {
      // console.log(data);
      // alert('comment added!!');
      $scope.post = data;
      $scope.commentText = '';
    });
  }

}]);