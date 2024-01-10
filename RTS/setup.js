var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Time
var frameRate = 60;

var deltaTime = 0;
var then = 0;

function liberateFramerate(now) {
    now *= 0.001 * frameRate;
    deltaTime = now - then;
    then = now;
}
