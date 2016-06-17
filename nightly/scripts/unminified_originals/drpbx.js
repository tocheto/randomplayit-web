var client;

$(document).ready(function() {
client = new Dropbox.Client({ key: "fdov2qv0majt9nk" });
//client.authDriver(new Dropbox.AuthDriver.Cordova());
$("#info").text( "client init");

client.authenticate(function(error, client) {
  if (error) {
    $("#info").text( "error client.authenticate"); return;
  }
  $("#info").text( "ok client.authenticate");
});
});


function init_drpbx() {
	var options = {

		// Required. Called when a user selects an item in the Chooser.
		success : function(files) {
			for ( var i in files) {
				localStorage.setItem(files[i].name, files[i].link);
				console.log(files[i].name);
				console.log(files[i].link);
			}
			;
			
		},

		// Optional. Called when the user closes the dialog without selecting a
		// file
		// and does not include any parameters.
		cancel : function() {

		},
		linkType : "direct", // or "preview"
		multiselect : true, // or true
		extensions : [ '.mp3' ]
	};
	//var button = Dropbox.createChooseButton(options);
	//document.getElementById("dropbox_container").appendChild(button);
}