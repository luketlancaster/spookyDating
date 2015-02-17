/* jshint node: true */
'use strict';

//FUNCTIONS FOR TESTING//
var hello = function hello() {
  return 'world';
};

function addTwo(num1, num2) {
  return num1 + num2;
}

function addProfilePic(profilePicture) {
  $('img').attr('src', profilePicture);
}

function validatePassword(password) {
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
  var loginData;

  //LOGIN FUNCTION//
  $('#login').click(function(event) {
   event.preventDefault();
    var $form = $($(this).closest('form'));
    var email = $form.find('[type="email"]').val();
    var password = $form.find('[type="password"]').val();
    var loginData = {email: email, password: password};
    userLogin(loginData);
  });

  function userLogin(loginData) {
  fb.authWithPassword(loginData, function(err, auth) {
    if (err) {
      $('.error').text('BEWARE, SPOOKSTER! Your email address or password is invalid.');
    } else {
      goToProfilePage();
    }
  });
 };

  //REDIRECT FUNCTION - LOGIN//
  function goToProfilePage() {
    if (fb.getAuth()) {
      window.location.href = 'profile.html';
    } else {
      $('.error').text('BEWARE, SPOOKSTER! Your email address or password is invalid.');
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

  function addUserInformationToProfile(userInfo) {
    $('.profile_info_holder').append('<div><div>' + userInfo.name +
                                    '</div><div>' + userInfo.bio +
                                    '</div><div>' + userInfo.interests +
                                    '</div></div>');
  }

  //LOGOUT FUNCTION//
  $('#logout').click(function logout() {
    fb.unauth();
  });

  //REDIRECT FUNCTION - LOGOUT//
  //function goToLoginPage() {
    //if (fb.unauth()) {
      //window.location.href = 'index.html';
    //}
  //}
//});
