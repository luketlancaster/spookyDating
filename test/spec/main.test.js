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

describe('DOM', function () {
  describe('form', function () {
    before(function () {
      if (window.__karma__) {
        $('body').append('<form id="registerAndLogin"><input type="email" class="loginEmail"><input type="password" class="loginPassword"></form>')
      }
    });
    it('should exist', function () {
      $('form').should.exist;
    });
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

describe('', function() {
  before(function() {
    if (window.__karma__) {
      $('body').append('<div class="noMatches"><div class="bio"></div></div>')
    }
  });
  it('should add a bio to the profile', function() {
    var bio = "My name is monster";
    $('.bio').should.be('');
    addUserData();
    $('.bio').should.equal(bio);
  });
});


