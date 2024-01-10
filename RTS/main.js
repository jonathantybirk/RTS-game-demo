// Loop
function loop(now) {
    // Screen refresh
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Units
    for (unit of units) {
        unit.checkSelect();
        unit.setMarkers();
        unit.calculateMarkers();
        unit.rotate();
        unit.move();
    }

    for (var i = 0; i < units.length; i++) {
        for (var j = i + 1; j < units.length; j++) {
            if (units[i].checkCollision(units[j])) {
                console.log(i + " (unit) touching " + j + " (unit)!")
            }
        }
        for (var h = 0; h < hills.length; h++) {
            if (units[i].checkCollision(hills[h])) {
                console.log(i + " (unit) touching " + h + " (hill)!")
            }
        }
    }

    // Drawing
    for (hill of hills) hill.draw();

        // units
    for (unit of units) unit.draw();
    for (unit of units) {
        unit.drawMarker();
        unit.drawSelectionRing();
    }

    // UI
    UI.update();
    UI.draw();

    // Selector
    Selector.deselect();

    // Loop
    liberateFramerate(now);
    window.requestAnimationFrame(loop);

}

// Initialization
window.requestAnimationFrame(loop);