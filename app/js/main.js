/* jshint node: true */
'use strict';

//var fb = new Firebase('https://spookydating.firebaseio.com/');

var hello = function hello() {
  return 'world';
};

//var profilePicture = $('.profile_picture').val();

function addProfilePic (profilePicture) {
  $('img').attr('src', profilePicture);
}

function validatePassword (password) {
  if (password.length > 5) {
    return true;
  } else {
    return false;
  }
}

function validateEmailAddress (emailAddress) {
  if (emailAddress.substring(emailAddress.length-4) === ".com") {
    return true;
  } else {
    return false;
  }
}
//$(document).ready(function() {

  var $form = $('.form');
  var $tbody = $('.tbody');
  var fbUrl = 'https://spookydating.firebaseio.com';
  var fb = new Firebase(fbUrl);
  var usersFb;

  //LOGIN FUNCTION//
  $('#login').click(function(event) {
   event.preventDefault();
    var $form = $($(this).closest('form'));
    var email = $form.find('[type="email"]').val();
    var password = $form.find('[type="password"]').val();
    var loginData = {email: email, password: password};

    fb.authWithPassword(loginData, function(err, auth) {
      if (err) {
        $('.error').text('BEWARE, SPOOKSTER! Your email address or password is invalid.');
      } else {
        goToProfilePage();
      }
    });
  });

  //REDIRECT FUNCTION - LOGIN//
  function goToProfilePage() {
    if (fb.getAuth()) {
      window.location.href = 'profile.html'
    } else {
      $('.error').text('BEWARE, SPOOKSTER! Your email address or password is invalid.');
      return 'ERROR';
    }
  }

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

  //LOGOUT FUNCTION//
  //$('#logout').click(function logout() {
    //fb.unauth();
    //goToLoginPage();
  //});

  //REDIRECT FUNCTION - LOGOUT//
  //function goToLoginPage() {
    //if (fb.unauth()) {
      //window.location.href = 'index.html'
    //}
  //}

//});
