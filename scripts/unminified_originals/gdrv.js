
/**
 * Called when the client library is loaded to start the auth flow.
 */
function handleClientLoad() {
	window.setTimeout(checkAuth, 1);
	var authButton = document.getElementById('authorizeButton');
	authButton.onclick = function() {
		getItems();
	};
}

/**
 * Check if the current user has authorized the application.
 */
function checkAuth() {
	gapi.auth.authorize({
		'client_id' : '1079074758321-3qe5h715ead6kvep8feee282v404bcok.apps.googleusercontent.com',
		'scope' : 'https://www.googleapis.com/auth/drive',
		'immediate' : true
	}, handleAuthResult);
}

/**
 * Called when authorization server replies.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
	var authButton = document.getElementById('authorizeButton');
	//var filePicker = document.getElementById('filePicker');
	//authButton.style.display = 'none';
	//filePicker.style.display = 'none';
	if (authResult && !authResult.error) {
		// Access token has been successfully retrieved, requests can be sent to the API.
		getItems();

	} else {
		// No access token could be retrieved, show the button to start the authorization flow.
		//authButton.style.display = 'block';
		checkAuth();
		/*authButton.onclick = function() {
			gapi.auth.authorize({
				'client_id' : CLIENT_ID,
				'scope' : SCOPES,
				'immediate' : false
			}, handleAuthResult);
		};*/
	}
}

function getItems() {
	var request = gapi.client.request({
		'path' : 'drive/v2/files',
		'method' : 'GET',
		'params' : {
			//'maxResults': '10',
			'q' : "mimeType contains 'audio/'",
			'fields' : 'items(title,webContentLink)'
		}
	});
	request.execute(listItems);
}

function listItems(resp) {
	var result = resp.items;
	//var i = 0;
	//for (i = 0; i < result.length; i++) {
	//	console.log(result[i].title);
	//};
	for(var i in result) {
		localStorage.setItem(result[i].title, result[i].webContentLink);
		console.log(result[i].title);
		console.log(result[i].webContentLink);
	};
}