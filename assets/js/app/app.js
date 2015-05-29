
var BloggyApp = angular.module('BloggyApp', ['ngRoute','ngResource','ui.bootstrap']);

BloggyApp.run(['$rootScope','AlertService','UserService',function($rootScope, AlertService, UserService) {

  console.log('bloggy is up and running');

  UserService.check(function(err, data){
    console.log('check', err, data);
  });

  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    // console.log('change',event,next,current);
    AlertService.clear();
  });

}]);

BloggyApp.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $routeProvider
  .when('/',{
    templateUrl:'/views/home.html',
    controller:'HomeCtrl'
  })
  .when('/about',{
    templateUrl:'/views/about.html',
    controller:'StaticCtrl'
  })
  .when('/post/:id',{
    templateUrl:'/views/post/show.html',
    controller:'PostShowCtrl'
  })
  .otherwise({
    templateUrl:'/views/404.html'
  })

}]);