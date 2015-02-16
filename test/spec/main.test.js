/* jshint mocha: true, expr: true, strict: false, undef: false */

describe('test suite', function () {
  it('should assert true', function () {
    true.should.be.true;
    false.should.be.false;
  });
});

describe('hello', function () {
  it('should return world', function () {
    hello().should.equal('world');
  });
});

//beforeEach(function () {
//    if (window.__karma__) {
//      $('body').empty();
//    }
//});

//describe('DOM', function () {
  //describe('form', function () {
    //before(function () {
      //if (window.__karma__) {
        //$('body').append('<form id="registerAndLogin">' +
                           //'<input type="email" class="loginEmail">' +
                           //'<input type="password" class="loginPassword">' +
                         //'</form>');
      //}
    //});
    //it('should exist', function () {
      //$('form').should.exist;
    //});

    //describe.skip('', function () {
      //it('', function  () {

      //});
    //});
    //describe.skip('newSkaracter', function () {
      //it('on boo click should load a new potential match', function () {


      //});
      //it('on ooh click should load a new potential match', function () {
      //});
    //});

    ////beforeEach(function () {
      ////$('#registerAndLogin').empty();
    ////});
  //});
//});



//describe('addProfilePic', function() {
  //before(function () {
    //if (window.__karma__) {
      //$('body').append('<div><img src=""></div>');
      //}
    //});
  //it('should upload a new profile picture', function() {
    //var profilePicture = 'https://encrypted-tbn1.gstatic.com/' +
                         //'images?q=tbn:ANd9GcS6H-zrpSy35X405e' +
                         //'8Ske1fuYB_vQNcNP1pZDkf7mOQirUE9ee6oA';
    //$('img').attr('src').should.equal('');
    //addProfilePic(profilePicture);
    //$('img').attr('src').should.equal(profilePicture);
  //});
//});

describe('validatePassword', function() {
  it('should check that password length is greater than 5 characters', function() {
   var pword1 = "abc";
   var pword2 = "abcdefg";
   validatePassword(pword1).should.be.false;
   validatePassword(pword2).should.be.true;
  });
});

describe('validateEmailAddress', function() {
  it('should verify that email address ends in ".com"', function () {
    var email1="sscotth@scott.io";
    var email2="countChocula@gmail.com";
    validateEmailAddress(email1).should.be.false;
    validateEmailAddress(email2).should.be.true;
  });
});

describe('addTwo', function () {
  it('should add two numbers', function () {
  var num1 = 2;
  var num2 = 4;
  addTwo(num1, num2).should.equal(6);
  });
});

describe('addProfilePic', function() {
  before(function () {
    if (window.__karma__) {
      $('body').append('<div><img src=""></div>')
      }
    });
  it('should upload a new profile picture', function() {
    var picture = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS6H-zrpSy35X405e8Ske1fuYB_vQNcNP1pZDkf7mOQirUE9ee6oA';
    $('img').attr('src').should.equal("");
    addProfilePic(picture);
    $('img').attr('src').should.equal(picture);
  });
});

//describe('userLogin', function () {
  //it('should log a user in', function(done) {
     //var fbUrl = 'https://spookydating.firebaseio.com';
     //var fb = new Firebase(fbUrl);
     //var loginData = {email: 'a@b.com', password: '123456'};
     //userLogin(loginData);
     //fb.getAuth().password.email.should.contain('@');
     //done();
  //});
//});
