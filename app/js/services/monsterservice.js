'use strict';
// This service is for the management of monsters
angular.module('jasminetest').service('monsterSvc', ['$q', '$http', function($q, $http){
  var msvc = this;
  var monster = null;

  var genericRequest = function(httpConfig){
    var deferred = $q.defer();
    httpConfig.headers = httpConfig.headers || {
            'Content-Type':'application/x-www-form-urlencoded'};
    $http(httpConfig)
    .success(function(data,status,headers,config){
      deferred.resolve(data,status,headers,config);
    })
    .error(function(data,status,headers,config){
      deferred.reject(data,status,headers,config)
    });
    return deferred.promise;
  };

  var methods = {
    newmonster: function(mtr){
      return genericRequest({
        'method': 'POST',
        'url': 'http://monster_repository/monster/new',
        'data': $.param(mtr)
      });
    },
    getmonster: function(id){
      return genericRequest({
        'method': 'GET',
        'url': 'http://monster_repository/monster/'+ id,
      });
    },
    setname: function(id,name){
      return genericRequest({
        'method': 'PUT',
        'url': 'http://monster_repository/monster/changename/'+ id,
        'data': {'name': name}
      })
      .then(
        function(){
          return name;
        }
      );
    },
    getname: function(id){
      return genericRequest({
        'method': 'GET',
        'url': 'http://monster_repository/monster/name/'+ id,
      });
    },
    setrace: function(id,race){
      return genericRequest({
        'method': 'PUT',
        'url': 'http://monster_repository/monster/changerace/'+ id,
        'data': {'race': race}
      });
    },
    getrace: function(id){
      return genericRequest({
        'method': 'GET',
        'url': 'http://monster_repository/monster/race/'+ id,
      });
    },
    // evolve: function(){
    //
    // }
  };

  return methods;

}]);
