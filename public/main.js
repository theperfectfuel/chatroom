$(document).ready(function() {
	var socket = io();
	var username = socket.username;
	var input = $('input');
	var messages = $('#messages');
	var userCount = $('#user-count');

	var username = prompt("Enter a username");
	socket.emit('addUser', username);

	var addMessage = function(message) {
		messages.append('<div>' + message + '</div>');
	};

	var addOutMessage = function(message) {
		messages.append('<div>' + message + '</div>');
	};

	var addInMessage = function(message) {
		messages.append('<div>' + message + '</div>');
	};

	var countUsers = function(count) {
		userCount.html('<div>' + count + ' users online</div>');
	};

	input.on('keydown', function(event) {
		if (event.keyCode != 13) {
			return;
		}

		var message = input.val();
		//addMessage(socket.id + ': ' + message);
		socket.emit('message', message);
		input.val('');
	});

	countUsers(1);

	socket.on('message', addMessage);
	socket.on('outMsg', addOutMessage);
	socket.on('inMsg', addInMessage);
	socket.on('userCount', countUsers);

});