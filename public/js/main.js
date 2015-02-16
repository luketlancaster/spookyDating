/* jshint node: true */
'use strict';


var hello = function hello() {
  return 'world';
};


  var $form = $('.form');
  var $tbody = $('.tbody');
  var fbUrl = 'https://spookydating.firebaseio.com';
  var fb = new Firebase(fbUrl);
  var usersFb;

  function goToProfilePage () {
    if (fb.getAuth()) {
      window.location.href = 'profile.html'
    }
  }

  //LOGIN FUNCTION//
  $('#login').click(function(event) {
   event.preventDefault();
    var $form = $($(this).closest('form'));
    var email = $form.find('[type="email"]').val();
    var password = $form.find('[type="password"]').val();
    var loginData = {email: email, password: password};

    fb.authWithPassword(loginData, function(err, auth) {
      if (err) {
        $('.error').text(err);
      } else {
        location.reload(true);
      }
    });
    goToProfilePage();
  });

  //REGISTER FUNCTION//
  $('#createUser').click(function(event) {
    event.preventDefault();
    var $form = $($(this).closest('form'));
    var email = $form.find('[type="email"]').val();
    var password = $form.find('[type="password"]').val();
    var loginData = {email: email, password: password};

    registerAndLogin(loginData, function(err, auth) {
      if (err) {
        $('.error').text(err);
      } else {
        location.reload(true);
      }
    });
  });

  //REGISTER AND LOGIN FUNCTION//
  function registerAndLogin(obj, cb) {
    fb.createUser(obj, function(err) {
      if (!err) {
        fb.authWithPassword(obj, function(err, auth) {
          if (!err) {
            cb(null, auth);
          } else {
            cb(err);
          }
        });
      } else {
        cb(err);
      }
    });
  }

