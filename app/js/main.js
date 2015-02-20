/* jshint node: true, jquery: true  */
'use strict';
//$(document).ready(function() {
  var fbUrl = 'https://spookydating.firebaseio.com';
  var fb = new Firebase(fbUrl);
  var defaultPicture = "http://vignette4.wikia.nocookie.net/mansionsofmadness/images/4/4d/Cthonian.jpg/revision/latest/scale-to-width/212?cb=20130219200035";
  var usersFb;
  var userListSnapshot;
  var undecidedUsers = [];
  var profileInfo;
  var userInfo;

  //LOGIN FUNCTION//
  $('#login').click(function() {
    var $form = $($(this).closest('form'));
    var email = $form.find('[type="email"]').val();
    var password = $form.find('[type="password"]').val();
    var loginData = {email: email, password: password};
    userLogin(loginData);
  });

  function userLogin(loginData) {
    fb.authWithPassword(loginData, function(err) {
      if (err) {
        $('.error').text('BEWARE, SPOOKSTER! Your email address or password is invalid.');
      } else {
        goToProfilePage();
      }
    });
  }

  //REDIRECT FUNCTION - LOGIN//
  function goToProfilePage() {
      window.location.href = 'profile.html';
  }

  //REGISTER OR LOGIN FUNCTION//
  $('#createUser').click(function() {
    var $form = $($(this).closest('form'));
    var email = $form.find('[type="email"]').val();
    var password = $form.find('[type="password"]').val();
    var loginData = {email: email, password: password};

    registerAndLogin(loginData, function(err) {
      if (err) {
        $('.error').text('BEWARE, SPOOKSTER! Your email address or password is invalid.');
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
                     interests: $('#userProfileInterests').val()
                };

    addUserToDatabase(userInfo, function(data) {
      $('.profile_info_holder').attr('data-uuid', data);
    });

    addUserInformationToPage(userInfo);

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

  //CLEAR FORM//
  function emptyProfileForm(form) {
    $('form').empty();
  }


  //ADD USER INFORMATION TO PAGE//
  function addUserInformationToPage(data) {
    $('.profile_info_holder').append('<div><img src="' + data.image +
                                    '" class="profile_picture defaultPicture"><div>Name: ' + data.name +
                                    '</div><div>Bio: ' + data.bio +
                                    '</div><div>Interests: ' + data.interests +
                                    '</div></div>');

    $(".defaultPicture").error(function() {
      $(this).attr('src', defaultPicture);
    });
   }


  //LOAD INFORMATION WHEN LOGGED IN//
  if(fb.getAuth()) {
    usersFb = fb.child('users/' + fb.getAuth().uid);
    usersFb.once('value', function(data) {
      profileInfo = data.val();
      profileInfo.likes = [];
      profileInfo.dislikes = [];
      addUserInformationToPage(profileInfo);
    });

    //ON PAGE LOAD, GET USER OBJECT//
    fb.child('users').once('value', function(snap) {
      userListSnapshot = snap.val();
      _.forEach(userListSnapshot, function(user) {
        //array!
        undecidedUsers.push(user);
      });
      $('.potentialMatch').append('<div><img src="' + undecidedUsers[0].image + '"></div>' );
    });
  }

  //CLICK EVENT - LIKES//
  //$('#like').click(function(event) {
    //event.preventDefault();

  //});
  //
  //  //LIKE EVENT
  //$('#like').on('click', function(evt) {
    //evt.preventDefault();

    //var likedUuid = $('#matchImage').attr('data-uuid').val();

    //likeUser(likedUuid);
  //});

  //function likeUser(data, cb) {
    //var uuid = usersFb.push(data).key();
    //cb({ liked: uuid });
  //}

  $('#like_match').on('click', function() {
      //profileInfo.likes.push(this);
    console.log(_.keys(userListSnapshot));
  });

  //FIND UNMATCHED USERS//
  function findUnmatched(data, uuid) {
    debugger;
    var users      = _.keys(userListSnapshot);
    var myLikes    = usersLikes(data[0]);
    var myDislikes = usersDislikes(data[0]);
    var self       = [fb.getAuth().uid];

    return _.difference(users, self, myLikes, myDislikes);
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


