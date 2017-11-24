const socket = require('socket.io-client');
const socketUrl = 'https://rgb-socket-api.herokuapp.com/';
var socket = io.connect(socketUrl, {reconnect: true});
const rgbHandler = require('./src/rgbHandler.js');

socket.on('connect', function(){
    console.log('Client connected');
});

socket.on('rgb-pull', function(data){
    rgbHandler.changeColour(data);
});

socket.on('disconnect', function(){
    console.log('Client disconnected');
});