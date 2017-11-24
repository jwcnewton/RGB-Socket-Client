const io = require('socket.io-client');
const socketUrl = 'https://rgb-socket-api.herokuapp.com/';
var socket = io.connect(socketUrl, { reconnect: true });
var five = require("johnny-five");
var led = null;

five.Board().on("ready", function () {

    socket.on('connect', function () {
        console.log('Client connected');
    });

    socket.on('rgb-pull', function (data) {
        changeColour(data.text);
    });

    socket.on('disconnect', function () {
        console.log('Client disconnected');
    });

    led = new five.Led.RGB({
        pins: {
            red: 6,
            green: 5,
            blue: 3
        }
    });

    // Turn it on and set the initial color
    led.on();
    led.color("#FF0000");
});

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

let changeColour = (colour) => {
    let hexColour = rgbToHex(colour[0], colour[1], colour[2]);
    console.log(hexColour);
    led.color(hexColour);
    led.pulse(500);
}