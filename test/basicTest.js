var testedsum = function(a,b){
  return a + b;
};


describe('This basic test ', function(){

  beforeEach(module('jasminetest'));

  it('checks if sums are correctly done', function(){
    expect(testedsum(3,4)).toBe(7);
  });
});
