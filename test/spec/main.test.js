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
      var picture = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS6H-zrpSy35X405e8Ske1fuYB_vQNcNP1pZDkf7mOQirUE9ee6oA';
      $('body').append('<div><img src=""></div>')
      }
    });
  it('should upload a new profile picture', function() {
    $('img').attr('src').should.equal("");
    addProfilePic();
    $('img').attr('src').should.equal(picture);
  });
});
