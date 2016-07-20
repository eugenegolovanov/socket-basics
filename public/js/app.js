	var socket = io();//io() - function defined in socket.io-x.x.x.js file
 	// socket.connect('http://localhost:3011');

 	socket.on('connect', function () {
	 	console.log('Message from front end');
 	});

