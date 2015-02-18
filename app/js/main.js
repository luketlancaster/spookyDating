/* jshint node: true */
'use strict';

//FUNCTIONS FOR TESTING//
var hello = function hello() {
  return 'world';
};


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
  var default_picture ="http://vignette4.wikia.nocookie.net/mansionsofmadness/images/4/4d/Cthonian.jpg/revision/latest/scale-to-width/212?cb=20130219200035";
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
    var userProfileName       = $('#userProfileName').val();
    var userProfileImage      = $('#userProfileImage').val();
    var userProfileBio        = $('#userProfileBio').val();
    var userProfileInterests  = $('#userProfileInterests').val();

    var userInfo = { name: userProfileName,
                     image: userProfileImage,
                     bio:  userProfileBio,
                     interests: userProfileInterests
                    };

    addUserToDatabase(userInfo, function(data) {
      $('.profile_info_holder').attr('data-uuid', data.name);
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
    usersFb = fb.child('users/' + fb.getAuth().uid + '/data/profileInfo');
    var uuid = usersFb.push(data).key();
    cb({ name: uuid });
  }

  //APPEND PROFILE PICTURE TO PAGE//
  //function addProfilePic(profilePicture) {
    //$('.profile_picture').attr('src', profilePicture);
  //}


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
  function pullUserInformationFromFb(uuid, data) {
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
    usersFb = fb.child('users/' + fb.getAuth().uid + '/data/profileInfo');

    usersFb.once('value', function(data) {
      var profileInfo = data.val();
      Object.keys(profileInfo).forEach(function(uuid) {
        pullUserInformationFromFb(uuid, profileInfo[uuid]);
      });
    });
  }

  //LOGOUT FUNCTION//
  $('#logout').click(function logout() {
    fb.unauth();
  });

  fb.child('users').once('value', function(snap) {
    var data = snap.val();

    console.log('Undecided simplelogin:2', undecided(data, 'simplelogin:2'));
  });


  //LIKE EVENT
  //$('#like').on('click', function(evt) {
    //evt.preventDefault();

    //var likedUuid = $('#matchImage').attr('data-uuid').val();

    //likeUser(likedUuid);
  //});

  //function likeUser(data, cb) {
    //var uuid = usersFb.push(data).key();
    //cb({ liked: uuid });
  //}

  //FIND USERS NOT LIKED OR DISLIKED
  function findUmatched(data, uuid) {
    var users      = _.keys(data),
        myLikes    = usersLikes(data[uid].data),
        myDislikes = usersDislikes(data[uid].data),
        self       = [uid];

    return _.difference(users, self, myLikes, myDislikes);
  }

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

  $('#logout').click(function() {
    fb.unauth();
    window.location.href = 'index.html';
  });

//});
