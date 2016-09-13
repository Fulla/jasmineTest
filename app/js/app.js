'use strict';

angular.module('jasminetest', ['ngRoute'])
.config(function($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controllerAs: 'main'
    })
    .when('/monster/:id', {
      templateUrl: 'views/monsterview.html',
      controllerAs: 'mns'
    })
    .otherwise({
      redirectTo: '/'
    });
});
