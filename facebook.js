(function() {
    var e = document.createElement('script'); e.async = true;
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    document.getElementById('fb-root').appendChild(e);
    }());

  window.fbAsyncInit = function() {
    FB.init({ appId: '300415503303521', 
    status: true, 
    cookie: true,
    xfbml: true,
    oauth: true});

    FB.Event.subscribe('auth.statusChange', handleStatusChange);  
  };
  
  function login() {
    FB.login(function(response) { }, {scope:'user_about_me,publish_actions'});
  }


  function sendRequest() {
    FB.ui({
      method: 'apprequests',
      message: 'I have an idea!'
    }, 
    function(response) {
      console.log('sendRequest response: ', response);
    });
  }

  
  function handleStatusChange(response) {
    if (response.authResponse) {
      console.log(response);
      updateUserInfo(response);
      //getCommonLikes(response);
    }
  }
  
  function updateUserInfo(response) {
    FB.api('/me&fields=id,name', function(response) {
      document.getElementById('user-info').innerHTML = '<img src="https://graph.facebook.com/' + response.id + '/picture">' + response.name;
    });
  }
  
function likeIdea()
{
	FB.api('/johnyen/hackathondating:like' + 
				'?idea=http://adrienjoly.com/HackathonDating/idea1.html','post',
				function(response) {
		if (!response || response.error) {
				alert('Error occured');
		} else {
			alert('Post was successful! Action ID: ' + response.id);
			}
	});
}
  

/*
  function getCommonLikes(response) {
      var output = '';
      
    navigator.geolocation.getCurrentPosition(function(location) {
      $.ajax({url: 'api.php', type: "POST", dataType: 'json', data: { method: "getCommonLikes", location: location.coords }, success: function(data) {
        output = '';
        
        console.log(data);
        
        for (var i = 0; i < data.likes.length; i++) {
          output += '<h3>' + data.likes[i].like_name + '<h3>';
          
          if (data.likes[i].uids) {
            output += '<h4>Shared with</h4>';
            for (var n = 0; n < data.likes[i].uids.length; n++) {
              output += '<img src="http://graph.facebook.com/' + data.likes[i].uids[n].id + '/picture"> ' + data.likes[i].uids[n].name;
            }
            
            output += '<br><br>';
          }
        }
        
        $("body").append(output);
        console.log(output);
      }});
    },
    function(error) {
      alert('You need to allow location, first.  Please refresh.');
    });
  }
*/

 /*
  function publishStory() {
    FB.ui({
      method: 'feed',
      name: 'I\'m building a social mobile web app!',
      caption: 'This web app is going to be awesome.',
      description: 'Check out Facebook\'s developer site to start building.',
      link: 'http://www.mattwkelly.com/icebreaker',
      picture: 'http://www.facebookmobileweb.com/hackbook/img/facebook_icon_large.png'
    }, 
    function(response) {
      console.log('publishStory response: ', response);
    });
    return false;
  }
  */