/* jshint node: true */
'use strict';

//var fb = new Firebase('https://spookydating.firebaseio.com/');

var hello = function hello() {
  return 'world';
};

var profilePicture = $('.profile_picture').val();

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
