class Selector {
    static position = [];
    static hasSelected = false;
    static hasClicked = false;
    static hasRightClicked = false;
    static markerPosition = [];
    static selectedAmount = 0;
    
    static updatePosition(event) {
        var rect = canvas.getBoundingClientRect();
        if (event.clientX >= rect.left && event.clientX <= rect.right 
        && event.clientY >= rect.top && event.clientY <= rect.bottom) {
            var x = Math.round(event.clientX - rect.left);
            var y = Math.round(event.clientY - rect.top);
            Selector.position = [x, y];
        }
        else Selector.position = [];
    }
    static select() {
        Selector.hasSelected = false;
        Selector.hasLeftClicked = true;
    }
    static deselect() {
        Selector.hasLeftClicked = false;
        Selector.hasRightClicked = false;
        Selector.hasSelected = false;
    }
    static setMarker() {
        Selector.markerPosition = Selector.position; 
        Selector.hasRightClicked = true;
    }
}

window.addEventListener('mousemove', Selector.updatePosition);
canvas.addEventListener('click', Selector.select);
document.addEventListener('contextmenu', event => event.preventDefault());
canvas.oncontextmenu = function() { Selector.setMarker(); }

// Keys
document.addEventListener("keydown",updateKeysDown);
document.addEventListener("keyup",updateKeysUp);

var keys = {
    shift: false,
    ctrl: false,
    alt: false,
}
function updateKeysDown(event) { 
    if (event.keyCode == 16) keys.shift = true; 
    if (event.keyCode == 17) keys.ctrl = true;
    if (event.keyCode == 18) keys.alt = true; 
}
function updateKeysUp(event) 
{ 
    if (event.keyCode == 16) keys.shift = false;
    if (event.keyCode == 17) keys.ctrl = false;
    if (event.keyCode == 18) keys.alt = false; event.preventDefault(); 
}
