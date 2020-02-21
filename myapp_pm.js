var PowerMate = require('node-powermate');
var powermate = new PowerMate();
//powerMate = new PowerMate.PowerMate(i);

var io=require('socket.io-client');
var socket= io.connect('http://localhost:3000');

let volume = 0;

socket.emit('getState', '');
status = "null";
console.log('opening powermate');


socket.on('pushState',function(data){
    console.log(data.status);
    status = data.status ;
    volume = data.volume;
});

powermate.on('buttonDown', function () {
    console.log('button down');
    if (status == "play") {
        socket.emit('pause');
    } else {
        socket.emit('play');
    }
});

powermate.on('wheelTurn', function (delta) {
    volume = volume + delta*3;
    volume = volume < 0 ? 0 : volume;
    volume = volume > 100 ? 100 : volume;
    console.log('delta', volume);
    socket.emit('volume', volume);
    socket.emit('getState', '');
});

