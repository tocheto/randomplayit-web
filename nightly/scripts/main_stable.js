/*
var bubbles = [], PredefinedColor;
var MIN_DURATION = 15, MAX_DURATION = 45, MIN_DELAY = 5, MAX_DELAY = 50, MAX_BUBBLES = 10;
var DEVICE_WIDTH = 300, DEVICE_HEIGHT = 500, TWEET_DUR_TIME = 2000;

var Dropbox, TOKEN;
*/
$(document).ready(function() {
	Stage.init();
	MC.init();
	NC.init();
	
});

window.onresize = function(event) {
	Stage.refresh();
};


/*
function generateAnimation() {
	$(bubbles).velocity("stop");
	bubbles.forEach(function(bubble) {
		$(bubble).remove();
	});

	bubbles = [];
	generateKeyframes(bubbles);
}

function generateKeyframes(mediainfos) {
	var i, j, time = 0;
	var color = getColor(PredefinedColor);

	for (i = 0; i < MAX_BUBBLES; i++) {
		time = TWEET_DUR_TIME;
		mediainfos[i] = makeBubble(color);
		$(mediainfos[i]).velocity({
			translateX : DEVICE_WIDTH / 2 + 'px',
			translateY : DEVICE_HEIGHT + 5 + 'px',
			//translateY : DEVICE_HEIGHT * 0.2 + 'px',
			opacity : 1,
			translateZ : 0
		}, {
			duration : 10,
			delay : 0,
			loop : false
		})

		for (j = 0; j < 4; j++) {
			time = generateRandomFrame(mediainfos[i], time);
		}
		;

		$(mediainfos[i]).velocity({
			opacity : 0,
			translateZ : 0,
			scale : 4
		}, {
			duration : 200,
			loop : false,
			complete : generateAnimation
		});

	}
	;
	$(".media-display").one("click", playSelectedSong);
}

function makeBubble(color) {
	//var color = getColor();
	var newMediaInfo = document.createElement('div');

	newMediaInfo.style.color = color;
	$(newMediaInfo).addClass("media-display");

	var newMediaInfoText = document.createElement('span');
	$(newMediaInfoText).text(getRandomSongKey());

	$(newMediaInfo).append(newMediaInfoText);
	$(newMediaInfo).textfill({
		minFontPixels : 0,
		maxFontPixels : 0
	});

	$('#stage').append(newMediaInfo);

	return newMediaInfo;
}

function generateRandomFrame(actor, time) {
	$(actor).velocity({
		translateX : getBubbleX() + 'px',
		translateY : getBubbleY() + 'px',
		translateZ : 0
	}, {
		duration : time,
		delay : 2500,
		easing : getRandomEasing(),//'easeInOutQuart',
		loop : false
	})
	return time += TWEET_DUR_TIME;
}
*/

/*-------- utility methods -------------*/
/*
function getBubbleX() {
	return Math.random() * DEVICE_WIDTH - 30;
	// Useful : Math.floor(Math.random() * (MAX_DURATION - MIN_DURATION + 1)) +
	// MIN_DURATION;
	// return Math.floor(Math.random() * (DEVICE_WIDTH - 100 + 1)) + 100;
}
function getBubbleY() {
	//return Math.random() * DEVICE_HEIGHT-150;
	// Useful : Math.floor(Math.random() * (MAX_DURATION - MIN_DURATION + 1)) +
	// MIN_DURATION;
	return Math.floor(Math.random() * ( (DEVICE_HEIGHT - 50) - 10) ) - 120;
}

function getColor(PredefinedColor) {
	if (PredefinedColor == undefined) {
		return getRandomColor();
	}
	return PredefinedColor;
}
function getRandomColor() {
	return 'rgb(' + parseInt(Math.random() * 255, 10) + ','
			+ parseInt(Math.random() * 255, 10) + ','
			+ parseInt(Math.random() * 255, 10) + ')'
}
function getRandomEasing() {
	var keys = [ 'bouncePast', 'easeInOutBack', 'swingFromTo' ]
	return keys[parseInt(Math.random() * keys.length, 10)];
}


function setDeviceDimensions() {
	DEVICE_WIDTH = document.documentElement.clientWidth;
	DEVICE_HEIGHT = document.documentElement.clientHeight;
}
*/

/*----------MediaElement Initialization-------------------*/
/*
function init_me() {
	$('video,audio').mediaelementplayer({
		success : function(mediaElement, domObject) {
			mediaElement.addEventListener('ended', function(e) {
				playRandomSong(e.target);
			}, false);
		},
		keyActions : [],
	    iPadUseNativeControls: true,
	    iPhoneUseNativeControls: true,
	    AndroidUseNativeControls: true,
	    enableAutosize: false,
	    features: ['playpause','progress','current','volume'],
	});
}
*/
//function playSelectedSong() {
//	var key = $(this).text();
//	var audio_src = localStorage[key];
//	playFromCloud(key,audio_src);
	
	//playSong('undefined',audio_src);
	//playSongNative(audio_src);
	
	/* only for installed apps
	Player.stop();
     $('#media-name').text(key);
      $('#media-path').text(audio_src);
      $('#player-play').click(function() {
         Player.playPause(audio_src);
      });
      $('#player-stop').click(Player.stop);
      $('#time-slider').on('slidestop', function(event) {
         Player.seekPosition(event.target.value);
      });
	//Player.initMedia(audio_src);
	Player.playPause(audio_src);
	*/
//}
/*
function playSong(currentPlayer, source) {
	if (currentPlayer === 'undefined') {
		currentPlayer = $('audio#mejs:first')[0];
	};
	currentPlayer.player.pause();
	currentPlayer.player.setSrc(source);
	currentPlayer.player.play();
}

function playRandomSong(currentPlayer) {
	var key = getRandomSongKey();
	var audio_src = localStorage[key];
	playFromCloud(key,audio_src);
	//playSong(currentPlayer,audio_src);
}
*/
/*
function getRandomSong() {
	var max = localStorage.length;
	var i = Math.floor(Math.random() * max);
	var key = localStorage.key(i);
	return localStorage[key];
}
*/
/*
function getRandomSongKey() {
	var max = localStorage.length;
	var i = Math.floor(Math.random() * max);
	return localStorage.key(i);
}
*/
/* ----------End MediaElement Initialization ------------- */

/* ----------Dropbox Initialization ------------- */
function init_drpbx() {
	var options = {
		// Required. Called when a user selects an item in the Chooser.
		success : function(files) {
			for ( var i in files) {
				localStorage.setItem(files[i].name, files[i].link);
			}
			;
		},
		cancel : function() {
		},
		linkType : "direct", // or "preview"
		multiselect : true, // or true
		extensions : [ 'audio' ]
	};
	if (Dropbox != undefined) {
		var button = Dropbox.createChooseButton(options);
		$(button).insertAfter("#onedrive");
	}
}
/* ----------End Dropbox Initialization ------------- */

/* ----------GDrive Initialization ------------- */
/**
 * Called when the client library is loaded to start the auth flow.
 */
function gdriveInitLoad() {
	$('#gdrive').show();
	window.setTimeout(checkGDriveAuthImmediate, 1);
}

/**
 * Check if the current user has authorized the application.
 */
function checkGDriveAuthImmediate() {
	if (gapi.auth) {
		gapi.auth
				.authorize(
						{
							'client_id' : '550306267493-i17vb0to2b0ipphj5tt901777t0j9s5k.apps.googleusercontent.com',
							'scope' : 'https://www.googleapis.com/auth/drive.readonly',
							'immediate' : true,
							'redirect_uri': 'urn:ietf:wg:oauth:2.0:oob'
						}, handleAuthResult);
	}
}
function checkGDriveAuth() {
	if (gapi.auth) {
		gapi.auth
				.authorize(
						{
							'client_id' : '550306267493-i17vb0to2b0ipphj5tt901777t0j9s5k.apps.googleusercontent.com',
							'scope' : 'https://www.googleapis.com/auth/drive.readonly',
							'immediate' : false,
							'redirect_uri': 'urn:ietf:wg:oauth:2.0:oob'
						}, handleAuthResult);
	}
}

/**
 * Called when authorization server replies.
 * 
 * @param {Object}
 *            authResult Authorization result.
 */
function handleAuthResult(authResult) {
	if (authResult && !authResult.error) {
		// Access token has been successfully retrieved, requests can be sent to
		// the API.
		getItems();
	} else {
		// No access token could be retrieved, show the button to start the
		// authorization flow.
		// checkGDriveAuth();
	}
}

function getItems() {
	var request = gapi.client.request({
		'path' : 'drive/v2/files',
		'method' : 'GET',
		'params' : {
			// 'maxResults': '10',
			'q' : "mimeType contains 'audio/'",
			'fields' : 'items(title,webContentLink)'
		}
	});
	request.execute(listItems);
}

function listItems(resp) {
	var result = resp.items;
	for ( var i in result) {
		localStorage.setItem(result[i].title, result[i].webContentLink);
		// console.log(result[i].title);
		// console.log(result[i].webContentLink);
	}
	;
}
/* ----------End GDrive Initialization ------------- */

/* ----------OneDrive Initialization ------------- */

function init_odrive() {
	WL.init({
        client_id: '0000000040136FF4',
        redirect_uri: 'http://playitrandomly.appspot.com/',
        scope: "wl.skydrive",
        response_type: "token"
    });
    WL.ui({
        name: "skydrivepicker",
        element: "onedrivetest",
        mode:"open",
        select:"multi",
        onselected: listSelected,
        brand:"skydrive"
    });
}
function loadODrive() {
	WL.init({
		client_id : '0000000040136FF4',
		redirect_uri : 'http://playitrandomly.appspot.com/',
		scope : "wl.skydrive",
		response_type : "token"
	});
	WL.fileDialog({
				mode : "open",
				select : "multi"
			})
			.then(
					function(response) {
						var msg = "";
						// For each folder selected...
						if (response.data.folders.length > 0) {
							for (folder = 0; folder < response.data.folders.length; folder++) {
								// Use folder IDs to iterate through child
								// folders and files as needed.
								listAudioInFolder(response.data.folders[folder].id);
							}
						}
						;
						// For each file selected
						for (i = 0; i < response.data.length; i++) {
							localStorage.setItem(response.data[i].name,
									response.data[i].source);
						}
						;

					},
					function(responseFailed) {
						document.getElementById("info").innerText = "Error getting folder/file info: "
								+ responseFailed.error.message;
					});
}

function listAudioInFolder(folderid) {
	WL.api({
		path : folderid + "/files?filter=audio,folders",
		// path: "me/files?filter=audio",
		method : "GET"
	}).then(
			function(response) {
				for (i = 0; i < response.data.length; i++) {
					if (response.data[i].type != "folder") {
						localStorage.setItem(response.data[i].name,
								response.data[i].source);
					} else {
						listAudioInFolder(response.data[i].id);
					}
				}
				;
			}, function(responseFailed) {
				console.log(responseFailed.error.message);
			});
}

function listSelected(response) {
	if (response.data.folders.length > 0) {
		for (folder = 0; folder < response.data.folders.length; folder++) {
			// Use folder IDs to iterate through child
			// folders and files as needed.
			listAudioInFolder(response.data.folders[folder].id);
		}
	}
	;
	// For each file selected
	for (i = 0; i < response.data.length; i++) {
		localStorage.setItem(response.data[i].name,
				response.data[i].source);
	}
	;
}

/* ----------End OneDrive Initialization ------------- */
/*
function loadCloud(provider) {
	var provider = this.id;
	switch (provider) {
	case 'dropbox':
		hello('dropbox').login( responseHandler);//init_drpbx();
		return;
	case 'gdrive':
		hello('google').login( responseHandler);//checkGDriveAuth();
		return;
	case 'onedrive':
		hello('windows').login( responseHandler);//loadODrive();
		return;
	default:
		return;
	}
}
*/

/* Local Library - Cordova */
function loadLocal() {
}
/*
function init_hello() {
	// Initate the library
    hello.init({
        google : '550306267493-5jcdcdg55ffe9hlkt5gruk8mv5mb8ppd.apps.googleusercontent.com',
        windows : '0000000040136FF4',
		dropbox : 'fdov2qv0majt9nk'
    }, {
        //
        // Define the OAuth2 return URL
        // This can be anything you like, providing its the callback which you have registered with the providers for OAuth2
        // It could even be localhost, e.g. http://localhost/somepath as phonegap is not run from a domain so SameOrigin breaks, instead we take advantage of being able to read the popups URL in PhoneGap
        redirect_uri : './redirect.html'
    });
    
}
function responseHandler(r){
	var callback;
	switch (r.network) {
	case 'dropbox':
		hello(r.network).api('audio').on('complete', listItemsDropbox);
		return;
	case 'google':
		hello(r.network).api('audio').on('complete', listItemsGdrive);
		return;
	case 'windows':
		hello(r.network).api('audio').on('complete', listItemsOdrive);
		return;
	default:
		return;
	}   
}
function listItemsDropbox(files) {
	if (files.error) {
		return;
	};
		for ( var i in files) {
			if (files[i].is_dir === true) {
				lp_listAudioInFolderD(files[i].path);
			} else {
				if ( files[i].mime_type.indexOf('audio')!= -1 && files[i].size.indexOf('MB') != -1) {
					var name = files[i].path.split("/").pop().replace(/\_/g,' ');
					var src = '{"provider":"dropbox", "id":"' + files[i].path +'"}';
					localStorage.setItem(name, src);
				}
			}
		};
}
function lp_listAudioInFolderD(folderid) {
	hello('dropbox').api('metadata/dropbox/' + folderid).on('complete', listItemsDropbox);
}
/*
function setMetadataD(file){
	localStorage.setItem(file.path, file.link);
}

function listItemsGdrive(items) {
	for ( var i in items.data) {
		var src = '{"provider":"google", "id":"' + items.data[i].id +'"}';
		localStorage.setItem(items.data[i].title.replace(/\_/g,' '), src);
	}
	;
}

function listItemsOdrive(response) {
	for (item = 0; item < response.data.length; item++) {
		if (response.data[item].type === 'folder') {
			lp_listAudioInFolder(response.data[item].id);
		} else {
			var src = '{"provider":"windows", "id":"' + response.data[item].id +'"}';
			localStorage.setItem(response.data[item].name.replace(/\_/g,' '),src);
		}
	};
}

function lp_listAudioInFolder(folderid) {
	hello('windows').api(folderid + "/files?filter=audio,folders").on('complete', listItemsOdrive);
}
*/


/* Auth Google drive from cordova */
/* http://phonegap-tips.com/articles/google-api-oauth-with-phonegaps-inappbrowser.html*/
/*
var googleapi = {
    authorize: function(options) {
        var deferred = $.Deferred();

        //Build the OAuth consent page URL
        var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + $.param({
            client_id: options.client_id,
            redirect_uri: options.redirect_uri,
            response_type: 'code',
            scope: options.scope
        });

        //Open the OAuth consent page in the InAppBrowser
        var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');

        //The recommendation is to use the redirect_uri "urn:ietf:wg:oauth:2.0:oob"
        //which sets the authorization code in the browser's title. However, we can't
        //access the title of the InAppBrowser.
        //
        //Instead, we pass a bogus redirect_uri of "http://localhost", which means the
        //authorization code will get set in the url. We can access the url in the
        //loadstart and loadstop events. So if we bind the loadstart event, we can
        //find the authorization code and close the InAppBrowser after the user
        //has granted us access to their data.
        $(authWindow).on('loadstart', function(e) {
            var url = e.originalEvent.url;
            var code = /\?code=(.+)$/.exec(url);
            var error = /\?error=(.+)$/.exec(url);

            if (code || error) {
                //Always close the browser when match is found
                authWindow.close();
            }

            if (code) {
                //Exchange the authorization code for an access token
                $.post('https://accounts.google.com/o/oauth2/token', {
                    code: code[1],
                    client_id: options.client_id,
                    client_secret: options.client_secret,
                    redirect_uri: options.redirect_uri,
                    grant_type: 'authorization_code'
                }).done(function(data) {
                    deferred.resolve(data);
                }).fail(function(response) {
                    deferred.reject(response.responseJSON);
                });
            } else if (error) {
                //The user denied access to the app
                deferred.reject({
                    error: error[1]
                });
            }
        });

        return deferred.promise();
    }
};
function authGoogle() {
	$.oauth2({
        auth_url: 'https://accounts.google.com/o/oauth2/auth',
        response_type: 'code',
        token_url: 'https://accounts.google.com/o/oauth2/token',
        logout_url: 'https://accounts.google.com/logout',
        client_id: '550306267493-i17vb0to2b0ipphj5tt901777t0j9s5k.apps.googleusercontent.com',
        client_secret: 'LvOLhcar59ZhgBuXZe4vtich',
        redirect_uri: 'urn:ietf:wg:oauth:2.0:oob:auto',
        other_params: {scope:'https://www.googleapis.com/auth/drive.readonly'}
    }, function(token, response){
		TOKEN = token;
        hello('google').api
			("drive/v2/files?q=mimeType contains 'audio/'&fields=items(title,id)&access_token=" + token)
			.on('complete', listItemsGdrive);
    }, function(error, response){
        alert(error);
    }); 
}
*/
