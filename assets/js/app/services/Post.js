BloggyApp.factory('Post',['$resource',function($resource){

  return $resource('/api/post/:id', null, {
    'update': { method:'PUT' }
  });

}]);