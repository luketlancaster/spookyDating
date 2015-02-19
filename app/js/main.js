/* jshint node: true */
'use strict';

//FUNCTIONS FOR TESTING//
var hello = function hello() {
  return 'world';
};


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
  var default_picture ="http://vignette4.wikia.nocookie.net/mansionsofmadness/images/4/4d/Cthonian.jpg/revision/latest/scale-to-width/212?cb=20130219200035";
  var usersFb;
  var loginData;
  var userListSnapshot;
  var undecidedUsers = [];
  var userInfo;

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
        goToProfilePage();
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

  //APPEND TO PROFILE AND PUSH TO FIREBASE//
  $('#submitUserDataToPage').click(function(event) {
    event.preventDefault();
     userInfo = { name: $('#userProfileName').val(),
                     image: $('#userProfileImage').val(),
                     bio: $('#userProfileBio').val(),
                     interests: $('#userProfileInterests').val(),
                     likes: [],
                     dislikes: [],
                     undecided: []
                    };

    addUserToDatabase(userInfo, function(data) {
      $('.profile_info_holder').attr('data-uuid', data);
      userInfo.uuid = data;
    });

    addUserInformationToProfile(userInfo);
    $('#userProfileName').val('');
    $('#userProfileImage').val('');
    $('#userProfileBio').val('');
    $('#userProfileInterests').val('');

    $('#add_profile_info').toggleClass('hidden');
  });

  //PUSH TO DB FUNCTION//
  function addUserToDatabase(data, cb) {
    usersFb = fb.child('users/' + fb.getAuth().uid);
    var uuid = usersFb.set(data);
    cb(uuid);
  }


  //APPEND PROFILE INFO TO PAGE//
  function addUserInformationToProfile(userInfo) {
    $('.profile_info_holder').append('<div><img src="' + userInfo.image +
                                    '" class=profile_picture default_picture"><div>Name: ' + userInfo.name +
                                    '</div><div>Bio: ' + userInfo.bio +
                                    '</div><div>Interests: ' + userInfo.interests +
                                    '</div></div>');

    $(".default_picture").error(function() {
      $(this).attr('src', default_picture);
    });
  }

  //CLEAR FORM//
  function emptyProfileForm(form) {
    $('form').empty();
  }


  //PULL PROFILE INFO ONTO PAGE FROM FIREBASE//
  function pullUserInformationFromFb(data) {
    $('.profile_info_holder').append('<div><img src="' + data.image +
                                    '" class="profile_picture default_picture"><div>Name: ' + data.name +
                                    '</div><div>Bio: ' + data.bio +
                                    '</div><div>Interests: ' + data.interests +
                                    '</div></div>');

    $(".default_picture").error(function() {
      $(this).attr('src', default_picture);
    });
   }


  //PULL FROM DB FUNCTION//
  if(fb.getAuth()) {
    usersFb = fb.child('users/' + fb.getAuth().uid);

    usersFb.once('value', function(data) {
      var profileInfo = data.val();
        pullUserInformationFromFb(profileInfo);
    });
     //GET USER OBJECT//
    fb.child('users').once('value', function(snap) {
      var userListSnapshot = snap.val();
      _.forEach(userListSnapshot, function(user) {
        undecidedUsers.push(user);
      });
      $('.potentialMatch').append('<div><img src="' + undecidedUsers[0].image + '"></div>' );
    });
  }

  //$('#like_match').click(function() {
    //debugger;
    //userInfo.likes.push(undecidedUsers.shift());
  //});

  function appendProspects(uuid, data) {
    ('.potentialMatch').append('<div><img src="' + data.profileInfo.image +
                               '" class="profile_picture default_picture"><div>Name: ' + data.profileInfo.name +
                               '</div><div>Bio: ' + data.profileInfo.bio +
                               '</div><div>Interests: ' + data.profileInfo.interests +
                               '</div></div>');
    ('.potentialMatch').attr('data-uuid', uuid);
  }

  function seeProspects() {
    usersFb = fb.child('users');
    usersFb.once('value', function(data) {
      Object.keys(data.val()).forEach(function(uuid) {
        appendProspects(uuid, data.val()[uuid]);
      });
    });
  }




  //FIND UNMATCHED USERS//
  function findUnmatched(data, uuid) {

    var users      = _.keys(data);
    var myLikes    = usersLikes(data[uuid].data);
    var myDislikes = usersDislikes(data[uuid].data);
    var self       = [uuid];

    return_.difference(users, self, myLikes, myDislikes);
  };

  //FIND MATCHES
  function matches(data, uuid) {
    var myLikes = usersLikes(data[uuid].data);

    return _.filter(myLikes, function(user, i) {
      var userData = data[user].data,
          userLikes = usersLikes(userData);

      return _.includes(userLikes, uuid);
    });
  }

  function usersLikes(userData) {
    if (userData && userData.likes) {
      return _(userData.likes)
        .values()
        .map(function(user) {
          return user.id;
        })
        .value();
    } else {
      return [];
    }
  }

  function usersDislikes(userData) {
    if (userData && userData.dislikes) {
      return _(userData.dislikes)
        .values()
        .map(function(user) {
          return user.id;
        })
        .value();
    } else {
      return [];
    }
  }

  //LOGOUT FUNCTION//
  $('#logout').click(function() {
    fb.unauth();
    window.location.href = 'index.html';
  });
//});
