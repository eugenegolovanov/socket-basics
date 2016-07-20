	var socket = io();//io() - function defined in socket.io-x.x.x.js file
 	// socket.connect('http://localhost:3011');


 	//listen to the 'connect' event. when we connected to server
 	socket.on('connect', function () {
	 	console.log('We connected with socket');
 	});

 	//listen to the custom 'message' event that we created at server.js
 	 socket.on('message', function (message) {
	 	console.log('Message text: ' + message.text);
 	});




//Handle submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();//prevent refreshing page when button pressed

	$messageField = $form.find('input[name=message]');

	//Sending message with text extracted from form
	socket.emit('message' , {
		text: $messageField.val() //.val() pull value out and return it as string
	});

	//Make field empty
	$messageField.val("");

	// var text = $('#textField').val();
	// console.log('----------------------------------------------------');
	// console.log('Text: ' + text);
	// console.log('----------------------------------------------------');
	// $('#textField').val("");

});