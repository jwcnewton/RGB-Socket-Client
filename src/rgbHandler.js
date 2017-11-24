var five = require("johnny-five");
var led;

five.Board().on("ready", function () {
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

exports.changeColour = changeColour;