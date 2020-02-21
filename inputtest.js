let gpio = require('rpi-gpio');

let LED_PIN_1 = 19; // GPIO10
let LED_PIN_2 = 21; // GPIO9
let LED_PIN_3 = 23; // GPIO11

const BUTTON_PIN_1 = 29; //GPIO5
const BUTTON_PIN_2 = 31; //GPIO6
const BUTTON_PIN_3 = 33; //GPIO13
const BUTTON_PIN_4 = 37; //GPIO26

const LED_BLINK_DELAY_MS = 1000;

let led1On = true;
let led2On = true;
let led3On = true;

process.stdout.write("test");
console.log("test")

gpio.on('change', (ch, value) => {
    console.log('read channel : '+ch+', value : '+value);
});

gpio.setup(BUTTON_PIN_1, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(BUTTON_PIN_2, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(BUTTON_PIN_3, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(BUTTON_PIN_4, gpio.DIR_IN, gpio.EDGE_BOTH);

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
