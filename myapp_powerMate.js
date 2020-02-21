var PowerMate = require('node-powermate');

var io=require('socket.io-client');
var socket= io.connect('http://localhost:3000');

var powerMate;

for (var i = 0; i < PowerMate.deviceCount(); i++) {
    socket.emit('getState', '');
    status = "null";
    console.log('opening powermate', i);

    powerMate = new PowerMate.PowerMate(i);

    socket.on('pushState',function(data){
        console.log(data.status);
        status = data.status ;
    });

    powerMate.on('buttonDown', function () {
        console.log('button down');
        if (status == "play") {
            socket.emit('pause');
        } else {
            socket.emit('play');
        }
    });

    powerMate.on('turn', function (delta, position) {
        console.log('delta', delta, 'position', position);
        socket.emit('volume', position);
    });
}
