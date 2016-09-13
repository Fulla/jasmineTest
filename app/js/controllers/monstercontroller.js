'use strict';

angular.module('jasminetest').controller('monsterCtrl', ['monsterSvc', '$routeParams', function(monsterSvc, $routeParams){
  var mns = this;
  mns.monster = {'id':null, 'name':'', 'power':0};
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
        mns.monster.name = data.name;
      }
    );
  };

  mns.setmonsterrace = function(race){
    monsterSvc.setrace(mns.monsterId,race).then(
      function(data){
        mns.monster.race = data.race;
      }
    );
  };

  mns.evolvemonster = function(){
    monsterSvc.evolve(mns.monsterId).then(
      function(data) {
        mns.monster = data;
      }
    );
  }

}]);
