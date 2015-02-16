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

//LOGIN AND MAKE PULL FROM API//
//usersFb = fb.child('users/' + fb.getAuth().uid + '/data');

//usersFb.once('value', function(data) {
  //var userInfo = data.val();
  //Object.keys(userInfo).forEach(function(uuid) {

  //});
//});

    //$.get(usersFirebaseUrl + '/contact.json?auth=' + fb.getAuth().token, function(data) {
      //if (data) {
        //Object.keys(data).forEach(function(uuid){
          //addRowToTable(uuid, data[uuid]);
        //});
      //}
    //});
  //}

  //LOGIN FUNCTION//
  $('#login input[type="button"]').click(function(event) {
    var email = $('#loginEmail').val();
    var password = $('#loginPassword').val();
    var loginData = {email: email, password: password};

    fb.authWithPassword(loginData, function(err, auth) {
      if (err) {
        $('.error').text(err);
      } else {
        location.reload(true);
      }
    });
  });

  //REGISTER FUNCTION//
  $('#createUser input[type="button"]').click(function(event) {
    var email = $('#loginEmail').val();
    var password = $('#loginPassword').val();
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

