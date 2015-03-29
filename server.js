var ws = require("nodejs-websocket");

var server = ws.createServer(function(conn) {
	console.log("New connection");
	conn.on("text", function(str) {
		console.log("Received " + str);
		conn.sendText(str.toUpperCase() + "!!!");
		try {
			var i = parseInt(str, 10);
			if (!isNaN(i)) {
				var data = {
					timestamp: new Date(),
					value: i,
					custom: true
				};
				console.log('Broadcasting custom value ' + i);
				broadcast(server, JSON.stringify(data));
			}
		} catch (e) {}
	});
	conn.on("close", function(code, reason) {
		console.log("Connection closed");
	});
	conn.on('error', function(err) {
		console.error(err);
	});
}).listen(8083);

setInterval(function() {
	var data = {
		timestamp: new Date(),
		value: Math.floor(Math.random() * 10)
	};
	broadcast(server, JSON.stringify(data));
}, 500);

function broadcast(server, msg) {
	server.connections.forEach(function(conn) {
		conn.sendText(msg)
	})
}