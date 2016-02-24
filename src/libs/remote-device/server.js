"use strict";

var Promise = require('bluebird'),
	clients = [],
	PeerJSKey = '';

alert('src/libs/remote-device/server.js :: Add your own PeerJS api key')

var Server = {
	start: function (onConn, onDisconn) {
		return new Promise(function (resolve, reject) {
			var peerServer = new Peer({ key: PeerJSKey });
			//
			peerServer.on('open', function (id) {
				//
				peerServer.on('connection', function (client) {
					// a client connected
					clients.push(client);
					onConn();
					//
					client.on('close', function () {
						//
						clients.splice(clients.indexOf(client), 1);
						//
						if (clients.length === 0) {
							onDisconn();
						}
					});
				});
				//
				resolve(id);
			});
		});
	},
	send: function (data) {
		if (clients.length) {
			clients.forEach(function (client) {
				client.send(data);	
			});
		}
		return this;
	}
};

module.exports = Server;
