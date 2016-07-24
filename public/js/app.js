	//http://localhost:3000/?name=euge&room=LOT%20Fans
	var name = getQueryVariable('name') || 'Anonymous';
	var room = getQueryVariable('room') || 'Empty Chatroom';

	//SOCKET
	var socket = io();//io() - function defined in socket.io-x.x.x.js file

	//chatroom header
	jQuery('.room-title').text(room);


 	//listen to the 'connect' event. when we connected to server
 	socket.on('connect', function () {
	 	console.log('Connected with socket');

	 	//generating Room wich user picked
	 	//AND creating sustom info about socket connection, then we can catch it with 'socket.id'
	 	socket.emit('joinRoom', {
	 		name:name,
	 		room:room
	 	});
 	});

 	//listen to the custom 'message' event that we created at server.js
 	 socket.on('message', function (message) {
	 	console.log('Message text: ' + message.text);

	 	//TIMESTAMP
		var timestampMoment = moment.utc(message.timestamp);//timestamp value to moment
		var dateString = timestampMoment.local().format('h:mm:ss a');//moment formatted string

	    //Appending messages into div
	 	var $message = jQuery('.messages');//getting text from textField
	 	$message.append('<p><strong>' + message.name  + ' ' + dateString + '</strong></p>');//adding date and name
	 	$message.append('<p>' + message.text + '</p>');//showing data
	 	// jQuery('.messages').append('<p><strong>' + dateString + '</strong> ' + message.text + '</p>');

 	});




//Handle submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();//prevent refreshing page when button pressed

	$messageField = $form.find('input[name=message]');

	//Sending message with text extracted from form
	socket.emit('message' , {
		name: name,
		text: $messageField.val(), //.val() pull value out and return it as string
		timestamp: moment().valueOf()//timestamp in miliseconds
	});

	//Make field empty
	$messageField.val("");

	// var text = $('#textField').val();
	// $('#textField').val("");

});