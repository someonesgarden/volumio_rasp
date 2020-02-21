let io=require('socket.io-client');
let socket= io.connect('http://localhost:3000');
let gpio = require('rpi-gpio');

let LED_RED     = 19; // GPIO10
let LED_GREEN   = 21; // GPIO9
//let LED_BLUE    = 23; // GPIO11
const BTN_VOL_DOWN    = 36; //GPIO16  VOLUME UP
const BTN_PLAY_TOGGLE = 33; //GPIO13 VOLUME DOWN
const BTN_VOL_UP      = 37; //GPIO26 PLAYTOGGLE

const LED_BLINK_DELAY_MS = 1000;
let volume      = 0;
let vol_delta   = 1;


process.stdout.write("test");
socket.emit('getState', '');
let status = "null";

socket.on('pushState',function(data){
    status = data.status;
    volume = data.volume;
});


gpio.setup(BTN_VOL_UP, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(BTN_VOL_DOWN, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(BTN_PLAY_TOGGLE, gpio.DIR_IN, gpio.EDGE_BOTH);

gpio.on('change', (ch, value) => {
    if(value){
        switch(ch){
            case BTN_VOL_UP:
                console.log("volume_up!");
                volume = volume + vol_delta;
                volume = volume > 100 ? 100 : volume;
                console.log('delta', volume);
                socket.emit('volume', volume);
                socket.emit('getState', '');
                break;

            case BTN_VOL_DOWN:
                console.log("volume_down!");
                volume = volume - vol_delta;
                volume = volume < 0 ? 0 : volume;
                console.log('delta', volume);
                socket.emit('volume', volume);
                socket.emit('getState', '');

                break;
            case BTN_PLAY_TOGGLE:
                console.log("play_toggle",status);

                if(status==='play'){
                    socket.emit('pause');
                }else{
                    socket.emit('play');
                }
                break;
        }
    }
});




gpio.setup(LED_RED, gpio.DIR_OUT, () => {
    setInterval(() => {
        if(status==='play') {
            gpio.write(LED_RED, false);
        } else if(status==='pause'){
            gpio.write(LED_RED, true);
        }
    },LED_BLINK_DELAY_MS);
});

gpio.setup(LED_GREEN, gpio.DIR_OUT, () => {
    setInterval(() => {
        if(status==='play'){
            gpio.write(LED_GREEN, true);
        }  else if(status==='pause'){
            gpio.write(LED_GREEN, false);
        }
    },LED_BLINK_DELAY_MS*2);
});

// gpio.setup(LED_BLUE, gpio.DIR_OUT, () => {
//     setInterval(() => {
//         if(led3On) {
//             gpio.write(LED_BLUE, false);
//             led3On = false;
//         } else {
//             gpio.write(LED_BLUE, true);
//             led3On = true;
//         }
//     },LED_BLINK_DELAY_MS*3);
// });
