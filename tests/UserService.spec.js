describe('UserService', function () {
  var $controller, UserService;
  beforeEach(module('app'));

  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/rest/user')
      .respond({first_name: 'jake', last_name: 'brady'});
  }));

  it('should get the current users information', function(){
    $httpBackend.expectGET('/rest/user');
    UserService
      .getUser()
      .then(function(res){
        if (res.first_name === 'jake' && res.last_name === 'brady'){
          done();
        }
      });
    $httpBackend.flush();
  });

  it('should create a full name', function(){
    expect(UserService.createFullName({first_name: 'jake', last_name: 'brady'})).toEqual('jake brady');
  });
});


