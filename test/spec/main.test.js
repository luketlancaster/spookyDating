/* jshint mocha: true, expr: true, strict: false, undef: false */

var fbUrl = 'https://spookydating.firebaseio.com';
var fb = new Firebase(fbUrl);


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

describe('addProfilePic', function() {
  before(function () {
    if (window.__karma__) {
      $('body').append('<div><img src=""></div>')
      }
    });
  it('should upload a new profile picture', function() {
    var picture = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS6H-zrpSy35X405e8Ske1fuYB_vQNcNP1pZDkf7mOQirUE9ee6oA';
    $('img').attr('src').should.equal("");
    addProfilePic();
    $('img').attr('src').should.equal(picture);
  });
});

