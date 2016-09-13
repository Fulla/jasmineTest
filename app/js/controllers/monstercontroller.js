'use strict';

angular.module('jasminetest').controller('monsterCtrl', ['monsterSvc', '$routeParams', function(monsterSvc, $routeParams){
  var mns = this;
  mns.monster = {'id':null, 'name':''};
  mns.monsterId = $routeParams.id;

  mns.getmonster = function(){
    monsterSvc.getmonster(mns.monsterId).then(
      function(data){
        mns.monster = data;
      }
    );
  };

  mns.getmonster();

  mns.setmonstername = function(name){
    monsterSvc.setname(mns.monsterId,name).then(
      function(data){
        mns.monster.name = data;
      }
    );
  };

}]);
