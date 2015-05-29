BloggyApp.controller('AuthLoginModalCtrl', ['$scope','UserService','$modalInstance', function($scope, UserService, $modalInstance) {
  // console.log('login modal controller!!')


  $scope.login = function() {
    UserService.login($scope.email, $scope.password, function(err, data){
      if(err){
        console.log(err);
        alert('something horrible happened.');
      }else if(data && data.result){
        $modalInstance.close();
      } else {
        console.log(data);
        alert('unable to log in');
      }
    });
  }



}]);