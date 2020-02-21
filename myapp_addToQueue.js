var io=require('socket.io-client');
var socket= io.connect('http://localhost:3000');


playlist = process.argv[2] || 'spotify:playlist:37i9dQZF1DX6UkADhBpEnE';

console.log('play', playlist);

socket.emit('addToQueue',{
    "uri":playlist,
    "service":"spop"
});
