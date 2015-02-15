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
        $('body').append('<form id="registerAndLogin">' +
                           '<input type="email" class="loginEmail">' +
                           '<input type="password" class="loginPassword">' +
                         '</form>');
      }
    });
    it('should exist', function () {
      $('form').should.exist;
    });

    describe.skip('', function () {
      it('', function  () {

      });
    });
    describe.skip('newSkaracter', function () {
      it('on boo click should load a new potential match', function () {


      });
      it('on ooh click should load a new potential match', function () {
      });
    });

    //beforeEach(function () {
      //$('#registerAndLogin').empty();
    //});
  });
});


