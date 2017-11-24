const io = require('socket.io-client');
const socketUrl = 'https://rgb-socket-api.herokuapp.com/';
var socket = io.connect(socketUrl, { reconnect: true });
var five = require("johnny-five");

five.Board().on("ready", function () {
    var led = new five.Led.RGB({
        pins: {
            red: 6,
            green: 5,
            blue: 3
        }
    });

    led.on();
    led.color("#FF0000");

    socket.on('connect', function () {
        console.log('Client connected');
    });

    socket.on('rgb-pull', function (data) {
        var colour = data.text;
        let hexColour = rgbToHex(colour[0], colour[1], colour[2]);
        console.log(hexColour);
        led.color(hexColour);
    });

    socket.on('disconnect', function () {
        console.log('Client disconnected');
    });
});

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
