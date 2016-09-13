describe('httpmocking', function(){
  var $httpBackend, myScope, newController;

  beforeEach(function(){ module('jasminetest'); });

  beforeEach(inject(function(_$controller_,_$httpBackend_,$rootScope){
    $httpBackend = _$httpBackend_;
    myScope = $rootScope.$new();
    var $controller = _$controller_;

    newController = function(id){
      return $controller('monsterCtrl', {'$scope': myScope, '$routeParams': {'id':id} });
    };

    $httpBackend.whenGET('http://monster_repository/monster/1').respond(200,{'id':1,'name':'Monstruin','race':'Gruffling','size':'medium'});
    $httpBackend.whenGET('http://monster_repository/monster/2').respond(200,{'id':2,'name':'Ferocin','race':'Gruffling','size':'large'});

    $httpBackend.whenRoute('PUT','http://monster_repository/monster/changename/')
    .respond(
      function(method, url, data, headers, params){
        return [200,data.name];
      }
    );
  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get the monster correctly', function(){
    var controller = newController(1);
    $httpBackend.flush();
    expect(controller.monster.name).toEqual('Monstruin');
  });

  it('should change the name of the monster correctly', function(){
    var controller = newController(2);
    $httpBackend.flush();
    expect(controller.monster.name).toEqual('Ferocin');
    controller.setmonstername('Krakerin');
    $httpBackend.flush();
    expect(controller.monster.name).toEqual('Krakerin');
  });


});
