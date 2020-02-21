let io=require('socket.io-client');
let socket= io.connect('http://localhost:3000');
let gpio = require('rpi-gpio');

let LED_PIN_1 = 19; // GPIO10
let LED_PIN_2 = 21; // GPIO9
let LED_PIN_3 = 23; // GPIO11
const BUTTON_PIN_1 = 29; //GPIO5

let volume = 0;
let vol_delta = 1;

const BTN_VOL_DOWN = 36; //GPIO16  VOLUME UP
const BTN_PLAY_TOGGLE = 33; //GPIO13 VOLUME DOWN
const BTN_VOL_UP = 37; //GPIO26 PLAYTOGGLE

const LED_BLINK_DELAY_MS = 1000;

let led1On = true;
let led2On = true;
let led3On = true;

process.stdout.write("test");

console.log("gpioToVolumio:INIT");
socket.emit('getState', '');
let status = "null";

socket.on('pushState',function(data){
    console.log(data.status);
    status = data.status ;
    volume = data.volume;
});


gpio.on('change', (ch, value) => {

    console.log('read channel : '+ch+', value : '+value);

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
                }else if(status==='pause'){
                    socket.emit('play');
                }
                break;
        }
    }
});

gpio.setup(BUTTON_PIN_1, gpio.DIR_IN, gpio.EDGE_BOTH);

gpio.setup(BTN_VOL_UP, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(BTN_VOL_DOWN, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(BTN_PLAY_TOGGLE, gpio.DIR_IN, gpio.EDGE_BOTH);

gpio.setup(LED_PIN_1, gpio.DIR_OUT, () => {
    setInterval(() => {
        if(led1On) {
            gpio.write(LED_PIN_1, false);
            led1On = false;
        } else {

            gpio.write(LED_PIN_1, true);
            led1On = true;
        }
    },LED_BLINK_DELAY_MS);
});

gpio.setup(LED_PIN_2, gpio.DIR_OUT, () => {
    setInterval(() => {
        if(led2On) {
            gpio.write(LED_PIN_2, false);
            led2On = false;
        } else {
            gpio.write(LED_PIN_2, true);
            led2On = true;
        }
    },LED_BLINK_DELAY_MS*2);
});

gpio.setup(LED_PIN_3, gpio.DIR_OUT, () => {
    setInterval(() => {
        if(led3On) {
            gpio.write(LED_PIN_3, false);
            led3On = false;
        } else {
            gpio.write(LED_PIN_3, true);
            led3On = true;
        }
    },LED_BLINK_DELAY_MS*3);
});
