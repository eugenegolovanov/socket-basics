var PORT = process.env.PORT || 3000; // process.env.PORT - port from heroku, if not heroku then 3000
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

var clientInfo = {};


//io.on - this callback listens events with one 'socket' connection, 'connection' - builtin event
io.on('connection', function (socket) {
	console.log('User connected via socket.io');

	//listen if user is disconnects, 'disconnect' - builtin event
	socket.on('disconnect', function () {
		var userData = clientInfo[socket.id];
		if (typeof userData !== 'undefined') {
			socket.leave(userData.room);//user left room

			//send message to all user of chatroom that user left chatroom
			io.to(userData.room).emit('message', {
				name: 'System',
				text: userData.name + ' left chatroom',
				timestamp: moment().valueOf()
			});
			//delete user info
			delete clientInfo[socket.id];

		}
	});


	//listen if someone joins a room, and send message only to members of this room
	socket.on('joinRoom', function (req) {
		//Store id of request
		clientInfo[socket.id] = req;

		//join tells to socket to join socket to specific room
		socket.join(req.room)
		//broadcast only to members of that room
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' has joined',
			timestamp: moment().valueOf()
		});
	});




	//listen any 'message' events
	socket.on('message', function (message) {
		console.log('Message received: ' + message.text);

		//timestamp
		message.timestamp = moment().valueOf();

		// io.emit('message', message); //sending to everyone
		// socket.broadcast.emit('message', message);//sending to everyone except sender
		io.to(clientInfo[socket.id].room).emit('message', message); //sending to room member only

	});

	
	//socket emit - emits the custom event, 'message' - custom name of the event
	socket.emit('message', {
		name: 'System',
		text: 'Welcome to chat app',
		timestamp: moment().valueOf()
	});
});


http.listen(PORT, function () {
	console.log('Server started! port:' + PORT);
});