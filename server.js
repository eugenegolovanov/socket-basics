var PORT = process.env.PORT || 3000; // process.env.PORT - port from heroku, if not heroku then 3000
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

//io.on - this callback listens events with one 'socket' connection
io.on('connection', function (socket) {
	console.log('User connected via socket.io');

	//listen any 'message' events
	socket.on('message', function (message) {
		console.log('Message received: ' + message.text);

		//timestamp
		message.timestamp = moment().valueOf();

		io.emit('message', message); //sending to everyone
		// socket.broadcast.emit('message', message);//sending to everyone except sender
	});




	
	//socket emit - emits the custom event, 'message' - custom name of the event
	socket.emit('message', {
		name: 'System',
		text: 'Welcome to chat app',
		timestamp: moment().format('x')
	});
});


http.listen(PORT, function () {
	console.log('Server started! port:' + PORT);
});