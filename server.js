var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);
var usernames = {};
var numUsers = 0;

io.on('connection', function (socket) {

	//numUsers++

	//socket.username = 'user' + numUsers;



	// when the client emits 'add user', this listens and executes
	socket.on('addUser', function (username) {
		// we store the username in the socket session for this client
		socket.username = username;
		// add the client's username to the global list
		usernames[username] = username;
		++numUsers;
		addedUser = true;
		socket.emit('userCount', numUsers);
		// echo globally (all clients) that a person has connected
		//socket.broadcast.emit('user joined', {
		  //username: socket.username,
		  //numUsers: numUsers
		//});
		var inMsg = socket.username + ' has arrived!';
		console.log(inMsg);
		socket.broadcast.emit('inMsg', inMsg);

		console.log(numUsers + ' users online');
		io.emit('userCount', numUsers);
	});




	var outMsg = socket.username + ' has left the building';

	socket.on('message', function(message) {
		console.log('Message from ' + socket.username + ':', message);
		io.emit('message', socket.username + ' ' + message);
	});

	socket.on('disconnect', function() {
		numUsers--
		console.log(numUsers + ' users online');
		socket.broadcast.emit('userCount', numUsers);
		console.log(outMsg);
		socket.broadcast.emit('outMsg', outMsg)
	});

});

server.listen('8080');