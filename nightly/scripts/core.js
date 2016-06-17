var Stage = {
   media: null,
   mediaTimer: null,
   bubbles:[],
   parameters: {MIN_DURATION : 15, MAX_DURATION : 45, MIN_DELAY : 5, MAX_DELAY : 50, MAX_BUBBLES : 10,
			  DEVICE_WIDTH : 300, DEVICE_HEIGHT : 500, TWEET_DUR_TIME : 2000, THEME : "zen",RANDOM_TYPE:"random", 
			  NUMBER_OF_FRAMES : 4, SHOW_WELCOME : 1,B_TEXT_SIZE:0,suggestions:true},
   init: function(path) {
		// set user settings
		var storedParameters = 'undefined';
		try {storedParameters = JSON.parse(localStorage.getItem('parameters')) || 'undefined'; }catch(e){} ;
		
		if (storedParameters != 'undefined') {
			Stage.parameters = storedParameters;
		} 
		/* ---- done with parameters ------*/
	  
		Stage.setDeviceDimensions();
		if (this.parameters.THEME != "default") {
			Stage.setTheme(null,Stage.parameters.THEME)
		};
	  
		$('#startBtn').on('click', function(event) {event.preventDefault(); Stage.startRandomness(Stage.parameters.RANDOM_TYPE);});
		$('#startA').on('click', function(event) {event.preventDefault(); Stage.startRandomness(Stage.parameters.RANDOM_TYPE);});
		$("#loadLocalBtn").on('click', function(event) {	event.preventDefault(); loadLocal();});

		$('.cloudPosibility').on("click", NC.login);
		//$('#gdrive').on("click", loadCloud);
		//$('#onedrive').on("click", loadCloud);
		
		//play / pause / fwd buttons
		$('#play').css('display','block');
		$('#pause').css('display','none');
		$('#play').on('click', function(event) {
			event.preventDefault(); $(event.target).css('display','none');
			$('#pause').css('display','block'); $('audio#mejs:first')[0].play();
		});
		$('#pause').on('click', function(event) {event.preventDefault(); $(event.target).css('display','none');
			$('#play').css('display','block'); $('audio#mejs:first')[0].pause();
		});
		$('#fwd').on('click', function(event) {event.preventDefault(); $('#pause').click(); MC.playRandomSong(event.target);});
		
		
	  
		if ( Stage.parameters.SHOW_WELCOME) { $('#guideBtn').click(); 
			Stage.parameters.SHOW_WELCOME = 0; };
	  
		//this.startRandomness(this.parameters.RANDOM_TYPE); 
		
		$('#searchInput').on('keyup', function(){
			//event.preventDefault(); 
			var searchStr = $('#searchInput').val().toLowerCase();
			if (searchStr.length > 3) { 
				Stage.search(searchStr)};
			//$('#searchInput').val('')
		});
		
		$('#clearSearch').on('click', function(event) {
			event.preventDefault();  $('#searchInput').val(''); Stage.parameters.RANDOM_TYPE = 'random';});
		
		Stage.adjustFontSize(Stage.parameters.B_TEXT_SIZE);
		
		Stage.saveParameters();
   },
   refresh : function() {
		Stage.setDeviceDimensions();
		Stage.startRandomness(this.parameters.RANDOM_TYPE); 
   },
   setDeviceDimensions: function() {
		Stage.parameters.DEVICE_WIDTH = document.documentElement.clientWidth;
		Stage.parameters.DEVICE_HEIGHT = document.documentElement.clientHeight;
   },
   startRandomness: function(type) {
		type = Stage.parameters.RANDOM_TYPE;
		
		// stop previous bubbles
		var bubbles = Stage.bubbles;
		$(bubbles).velocity("stop");
		bubbles.forEach(function(bubble) {$(bubble).remove(); });
		Stage.bubbles = bubbles =  [];
		Stage.generateKeyframes(type,bubbles,'#stage');
   },
   generateKeyframes: function(type,elements,container) {
		var i, j, time = 0, color = Utilities.getColor(Stage.parameters.BUBBLE_COLOR);
		for (i = 0; i < Stage.parameters.MAX_BUBBLES; i++) {
			time = Stage.parameters.TWEET_DUR_TIME;
			elements[i] = Stage.makeBubble(type,color,container);
			
			// initial frame - send the bubble to the bottom of the screen
			$(elements[i]).velocity({
				translateX : Stage.parameters.DEVICE_WIDTH / 2 + 'px',
				translateY : Stage.parameters.DEVICE_HEIGHT + 5 + 'px',
				opacity : 1, translateZ : 0}, {duration : 10,delay : 0,loop : false});
			// random frames
			for (j = 0; j < Stage.parameters.NUMBER_OF_FRAMES; j++) {
				time = Stage.generateRandomFrame(elements[i], time);
			};
			//final frame - make the bubbl explode
			$(elements[i]).velocity({opacity : 0,translateZ : 0,scale : 4}, 
									  {duration : 200,loop : false,complete : Stage.startRandomness});
			//bind to click events
			//$(".bubble").one("click", MC.playSelectedSong);
		};
	},
	makeBubble: function(type,color,container) {
		var newMediaInfo = document.createElement('div');
		newMediaInfo.style.color = color;
		$(newMediaInfo).addClass("bubble");
		var newMediaInfoText = document.createElement('span');
		if (type === "search") {$(newMediaInfoText).text(Utilities.getRandomSongKeySearch())} 
		else {$(newMediaInfoText).text(Utilities.getRandomSongKey())};
		$(newMediaInfo).append(newMediaInfoText);
		$(newMediaInfo).textfill({minFontPixels : 0,maxFontPixels : 0});
		$(container).append(newMediaInfo);
		
		if (Stage.parameters.B_TEXT_SIZE > 0) {
			$(newMediaInfo).css('font-size',Stage.parameters.B_TEXT_SIZE);
		};
		
		$(newMediaInfo).one("click", MC.playSelectedSong);

		return newMediaInfo;
	},
	generateRandomFrame : function(element,time) {
		$(element).velocity({
		translateX : Utilities.getBubbleX(this.parameters.DEVICE_WIDTH) + 'px',
		translateY : Utilities.getBubbleY(this.parameters.DEVICE_HEIGHT) + 'px',
		translateZ : 0
		}, { duration : time, delay : 2500, easing : Utilities.getRandomEasing(),loop : false });
		return time += Stage.parameters.TWEET_DUR_TIME;
	},
	setTheme : function (event, theme) {
		var themeId = "", cssId="", fullPath="";
		if (event != null) {
			event.preventDefault(); themeId = theme = event.target.id;
		} else { themeId = theme };
		
		if ( (themeId.indexOf("http://") >= 0 || themeId.indexOf("file:///") >= 0) &&  themeId.indexOf(".css") >= 0 ) {
			cssId = "externalThemeCss"; fullPath = theme;} 
		else {
			//cssId = theme + "ThemeCss"; fullPath = "./styles/"+themeId+"_theme.css";};
			cssId = themeId;};
		
		$('html').removeClass('zen waterfall');
		console.log('Please wait, loading theme...');
		if (cssId === "externalThemeCss") { //load external file
			$('head').append('<link href="'+ fullPath+'" rel="stylesheet" id="' +cssId +'" />');
		} else { $('html').addClass(cssId);};
		console.log('Theme loaded !');
			
		if (Stage.parameters.THEME !== theme) {
			Stage.parameters.THEME = themeId;Stage.saveParameters();}; 
		return;
	},
	saveParameters : function () {
		localStorage.setItem('parameters', JSON.stringify(Stage.parameters));
		return;
	},
	applyColor : function(color) {
		if (color === 'default') {
			delete Stage.parameters.BUBBLE_COLOR;	
		} else {
			Stage.parameters.BUBBLE_COLOR = color;
		};
		Stage.saveParameters();
		return;
	},
	adjustFontSize : function(newSize) {
		if (newSize > 0) {
			$('.bubble').css('font-size', newSize);
			Stage.parameters.B_TEXT_SIZE = newSize;
		} else {
			$('.bubble').css('font-size', '');
			Stage.parameters.B_TEXT_SIZE =0;
		};
		Stage.saveParameters();
	},
	initSettingsModal : function() {
		$('.settings').on("click",Stage.setTheme);
		// Settings modal - number of bubbles //
		$('#nmbrBbls').text(Stage.parameters.MAX_BUBBLES);
		$('#plusBblsBtn').on('click', function(event) { event.preventDefault();
			if (Stage.parameters.MAX_BUBBLES < 30) {
				Stage.parameters.MAX_BUBBLES++;  Stage.saveParameters();};
			$('#nmbrBbls').text(Stage.parameters.MAX_BUBBLES);	});
		$('#minusBblsBtn').on('click', function(event) { event.preventDefault();
			if (Stage.parameters.MAX_BUBBLES > 0) {
				Stage.parameters.MAX_BUBBLES--;  Stage.saveParameters();};
			$('#nmbrBbls').text(Stage.parameters.MAX_BUBBLES);	});
		// ------------------------------------//
		//Settings modal - adjust font size
		$('#fntBbls').text(Stage.parameters.B_TEXT_SIZE);
		$('#plusFntBtn').on('click', function(event) { event.preventDefault();
			Stage.adjustFontSize(++Stage.parameters.B_TEXT_SIZE)
			$('#fntBbls').text(Stage.parameters.B_TEXT_SIZE);	});
		$('#minusFntBtn').on('click', function(event) { event.preventDefault();
			Stage.adjustFontSize(--Stage.parameters.B_TEXT_SIZE)
			$('#fntBbls').text(Stage.parameters.B_TEXT_SIZE);	});
			
		$('#loadThemeBtn').on('click',function(event) { event.preventDefault();
			var themeAddr = $('#loadThemeAddr').text() || '';
			if (themeAddr != '') {
				Stage.setTheme(null,themeAddr);
			};
		});
		// ------------------------------------//
		
		//color buttons
		$('#dfltClrBtn').on('click', function(event) {event.preventDefault(); Stage.applyColor('default');});
		$('#crntClrBtn').on('click', function(event) {event.preventDefault(); 
			var crnt = $('.bubble:first').css('color') || "";
			if (crnt !== "") {Stage.applyColor(crnt);} });
		// ------------------------------------//
	},
	search : function(q) {
		if (q === "") {Stage.startRandomness(Stage.parameters.RANDOM_TYPE = 'random'); return;};
		
		Stage.parameters.searchResult = new Array();
		for (i in localStorage) {if (i !== "hello" && i !== "parameters" && i.toLowerCase().indexOf(q) >=0) {
			var strSong = localStorage.key(i).toString();
			var element = '{ "' + i + '" : ' + localStorage[i] + ',"name":' +i+' }'  ;
			Stage.parameters.searchResult.push(element );
			}
		}; 
		
		//NC.searchSuggestions(q);
		
		if (Stage.parameters.searchResult.length == 0) {return;}

		//Stage.parameters.searchResult = searchResult;
		Stage.parameters.RANDOM_TYPE = 'search';
		Stage.startRandomness('search');
		
		return;
	}
};

/* utility methods */
var Utilities = {
	getColor: function (color) {
		if (color == undefined) { return Utilities.getRandomColor();}
		return color;
	},
	getRandomColor: function () {
		return 'rgb(' + parseInt(Math.random() * 255, 10) + ','
			+ parseInt(Math.random() * 255, 10) + ','
			+ parseInt(Math.random() * 255, 10) + ')'
	},
	getRandomEasing :function () {
		var keys = [ 'bouncePast', 'easeInOutBack', 'swingFromTo' ]
		return keys[parseInt(Math.random() * keys.length, 10)];
	},
	getBubbleX :function (device_width) {
		return Math.floor(Math.random() * device_width - 30 );
		// return Math.floor(Math.random() * (DEVICE_WIDTH - 100 + 1)) + 100;
	},
	getBubbleY : function (device_height) {
	//return Math.random() * DEVICE_HEIGHT-150;
	return Math.floor(Math.random() * (device_height - 60) ) - 120;
	},
	getRandomSongKey : function() {
		var max = localStorage.length;
		
		if (max <= 2) {return 'there are no songs';}
		
		var i = Math.floor(Math.random() * max);
		var songKey =  localStorage.key(i);
		if (songKey === 'hello' || songKey === 'parameters') {
			return Utilities.getRandomSongKey();
		} else {return songKey};
	},
	getRandomSongKeySearch : function() {
		var searchResult = Stage.parameters.searchResult;
		
		
		var max = searchResult.length;
		var i = Math.floor(Math.random() * max);
		//return searchResult[i];
		var songKey = JSON.parse( searchResult[i] );
		return songKey.name;
		if (songKey === 'hello' || songKey === 'parameters') {
			return Utilities.getRandomSongKey();
		} else {return songKey};
	}
};

/* Media Controller */
var MC = {
	keyActions : [],
	iPadUseNativeControls: true,
	iPhoneUseNativeControls: true,
	AndroidUseNativeControls: true,
	enableAutosize: false,
	features: ['playpause','tracks'],
	init :function () {
		/*$('video,audio').mediaelementplayer({
			success : function(mediaElement, domObject) {
				mediaElement.addEventListener('ended', function(e) {
					MC.playRandomSong(e.target);
				}, false);
			},
			keyActions : MC.keyActions,
			iPadUseNativeControls: MC.iPadUseNativeControls,
			iPhoneUseNativeControls: MC.iPhoneUseNativeControls,
			AndroidUseNativeControls: MC.AndroidUseNativeControls,
			enableAutosize: MC.enableAutosize,
			features: MC.features
		});*/
		new MediaElement('mejs', {
			success: function (mediaElement, domObject) {  
				// add event listener
				mediaElement.addEventListener('ended', function(e) {
					MC.playRandomSong(e.target);
				}, false);
				//mediaElement.play();
			},
			// fires when a problem is detected
			error: function () {  
			},
			keyActions : MC.keyActions,
			iPadUseNativeControls: MC.iPadUseNativeControls,
			iPhoneUseNativeControls: MC.iPhoneUseNativeControls,
			AndroidUseNativeControls: MC.AndroidUseNativeControls,
			enableAutosize: MC.enableAutosize,
			features: MC.features
		});
	},
	playSelectedSong : function (event) {
		
		var key = $(this).text();
		var audio_src = localStorage[key];
		MC.retrievePathAndPlay(key,audio_src);
	
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
		if (event) { event.preventDefault();};
		return;
	},
	playSong : function (currentPlayer, source) {
		if (currentPlayer === 'undefined') {
			currentPlayer = $('audio#mejs:first')[0];
		};
		currentPlayer.pause(); $('#pause').click();
		currentPlayer.setSrc(source);
		currentPlayer.play(); $('#play').click();
		
	},
	playRandomSong : function (currentPlayer) {
		var key = '';
		if (Stage.parameters.RANDOM_TYPE == 'search') {key = Utilities.getRandomSongKeySearch();}
		else {key = Utilities.getRandomSongKey();};
		//var key = Utilities.getRandomSongKey();
		var audio_src = localStorage[key];
		MC.retrievePathAndPlay(key,audio_src);
		//playSong(currentPlayer,audio_src);
		/*$('#songTitle').text(key);*/
	},
	retrievePathAndPlay : function (key,infoStr) {
		$('#songTitle').text(key);
		
		var info = $.parseJSON(infoStr);
		var provider = info.provider, fileId = info.id;
		
		if (provider === 'local') {
			MC.playSong('undefined',fileId); 
		} else {NC.getNetworkLink(provider,fileId);}
		return;
	}
};

/* Network Controller */
var NC = {
	init : function() {
		// Initate the library
		hello.init({
			google : '550306267493-5jcdcdg55ffe9hlkt5gruk8mv5mb8ppd.apps.googleusercontent.com',
			windows : '0000000040136FF4', dropbox : 'fdov2qv0majt9nk', soundcloud : '46d8abdf4419023d86776f6c735f02b4',
			'4shared' : '8e319df9f196364b706e34fe10620354',spotify : '6ff834e4665f4703ba88f0b0ce12ec65'
		}, { redirect_uri : '../redirect.html'});
		/*hello.init({
			dropbox : 'fdov2qv0majt9nk'
		}, { redirect_uri : 'https://www.dropbox.com/1/oauth2/redirect_receiver'});*/
		
		//NC.autoLogin('google');
	},
	login : function(provider) {
		var provider = this.id;
		switch (provider) {
			case 'dropbox':		hello('dropbox').login( NC.retrieveList);	return;
			case 'gdrive':		hello('google').login( NC.retrieveList);	return;
			case 'onedrive':	hello('windows').login( NC.retrieveList);	return;
			case 'soundcloud':	hello('soundcloud').login( NC.retrieveList);return;
			case '4shared':		hello('4shared').login( NC.retrieveList);	return;
			default:return;
		}
	},
	autoLogin : function(provider) {
		hello(provider).login({force:false}).then(NC.retrieveList);
	},
	retrieveList : function(r) {
		var callback;
		switch (r.network) {
			case 'dropbox':	hello(r.network).api('audio').on('complete', NC.listItemsDropbox); return;
			case 'google':	hello(r.network).api('audio').on('complete', NC.listItemsGdrive); return;
			case 'windows':	hello(r.network).api('audio').on('complete', NC.listItemsOnedrive); return;
			case 'soundcloud':	hello(r.network).api('audio').on('complete', NC.listItemsSoundcloud); return;
			case '4shared':	hello(r.network).api('audio').on('complete', NC.listItems4shared); return;
			default:	return;
		}   
	},
	listItemsDropbox : function (files) {
		if (files.error) {return; };
		for ( var i in files) {
			if (files[i].is_dir === true) {
				hello('dropbox').api('metadata/dropbox/' + files[i].path).on('complete', NC.listItemsDropbox);
			} else {
				if ( files[i].mime_type.indexOf('audio')!= -1 && files[i].size.indexOf('MB') != -1) {
					var name = files[i].path.split("/").pop().replace(/\_/g,' ');
					var src = '{"provider":"dropbox", "id":"' + files[i].path +'"}';
					localStorage.setItem(name, src);
				}
			}
		};
	},
	listItemsGdrive : function (items) {
		for ( var i in items.items) {
			var src = '{"provider":"google", "id":"' + items.items[i].id +'"}';
			localStorage.setItem(items.items[i].title.replace(/\_/g,' '), src);
		};
	},
	listItemsOnedrive :function (response) {
		for (item = 0; item < response.data.length; item++) {
			if (response.data[item].type === 'folder') {
				hello('windows').api(response.data[item].id + "/files?filter=audio,folders").on('complete', NC.listItemsOnedrive);
			} else {
				var src = '{"provider":"windows", "id":"' + response.data[item].id +'"}';
				localStorage.setItem(response.data[item].name.replace(/\_/g,' '),src /*response.data[item].source*/);
			}
		};
	},
	listItemsSoundcloud :function (response) {
		for (item = 0; item < response.data.length; item++) {
			var tracks = response.data[item].tracks;
			for(track =0; track < tracks.length; track++) {
				var src = '{"provider":"soundcloud", "id":"' + tracks[track].id +'"}';
				localStorage.setItem(tracks[track].title.replace(/\_/g,' '),src );
			}
			
		};
	},
	listItems4shared :function (response) {
		for (item = 0; item < response.files.length; item++) {
			var src = '{"provider":"4shared", "id":"' + response.files[item].id +'"}';
			localStorage.setItem(response.files[item].name.replace(/\_/g,' '),src );	
		};
	},
	getNetworkLink : function(provider, fileId) {
		var session = hello.utils.store(provider) || {};
		var at = session.access_token || 'undefined';

		switch (provider) {
			case 'dropbox': 
				hello('dropbox').login({force:false,display:'none'}).
				then(function() { 
					hello('dropbox').api('media/dropbox'+fileId).
						then(  function(data) {
							MC.playSong('undefined',data.url + "?access_token=" + at); })
				}); break;
				
			case 'google':
				hello('google').login({force:false,display:'none'}).
				then(function() { 
					hello('google').api('drive/v2/files/'+ fileId + '?fields=downloadUrl').
						then( function(data) {
							MC.playSong('undefined',data.downloadUrl + "&access_token=" + at); })
				}); break;
				
			case 'windows':	
				hello('windows').login({force:false,display:'none'}).
				then(function() {
					hello('windows').api(fileId + '/content?download=true&suppress_redirects=true').
						then( function(data) {
							MC.playSong('undefined',data.location + "&access_token=" + at); })
				}); break;
				
			case 'soundcloud':	
				hello('soundcloud').login({force:false}).
				then(function() {
					MC.playSong('undefined','https://api.soundcloud.com/tracks/' + fileId + '/stream?oauth_token=' + at);}
				); break;
				
			case '4shared':	
				hello('4shared').login({force:false,display:'none'}).
				then(function() {
					hello('4shared').api('files/' + fileId + '.jsonp').
						then( function(data) {
							MC.playSong('undefined',data.downloadUrl ); })
				}); break;
				
			default:return;
		}; 
	},
	
	searchSuggestions : function(searchStr) {
		if (searchStr === "") {return;};
		//if (!Stage.parameters.suggestions) {return;};
		
		var session = hello.utils.store('soundcloud') || {};
		var at = session.access_token || 'undefined';
		
		hello('soundcloud').login({force:false}).
				then(function() {
					hello('soundcloud').api('tracks/?q=' + searchStr + '&sharing=public&limit=2&oauth_token=' + at).
						then (function(response) {
							for (item = 0; item < response.data.length; item++) {
								//var tracks = response.data[item].tracks;
								//for(track =0; track < tracks.length; track++) {
									var src = '{"provider":"soundcloud", "id":"' + response.data[item].id +'"}';
									Stage.parameters.searchResult.push(response.data[item].title.replace(/\_/g,' '),src );
								//}
			
							};
						})
				});
	}
	
}

/* runtime init */
$(document).ready(function() {
	Stage.init();
	MC.init();
	NC.init();
	
});

window.onresize = function(event) {
	Stage.refresh();
};
