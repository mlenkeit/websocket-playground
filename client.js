var ws = require("nodejs-websocket");

var conn = ws.connect('ws://localhost:8083', function() {
    console.log('Connected');

    conn.on("text", function(str) {
        console.log("Received " + str);
    });

    conn.sendText('hello world');
});