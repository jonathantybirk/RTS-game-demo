class Unit {
    constructor(position, direction) {
        this.position = position;
        this.direction = direction;
        this.rotating = false;
        this.markerPositionList = [];
        this.markerVectorList = [];
        this.markerDistanceList = [];
        this.markerDirectionList = [];
        this.markerMove = false;
        this.isSelected = false;
    }
    checkSelect() {
        if (Selector.hasLeftClicked) {
            this.mouseVector = [Selector.position[0] - this.position[0], Selector.position[1] - this.position[1]];
            this.mouseDistance = (this.mouseVector[0] ** 2 + this.mouseVector[1] ** 2) ** (1/2);
            if (this.mouseDistance < this.selectionSize) {
                if (!this.isSelected) {
                    this.isSelected = true;
                    Selector.hasSelected = true;
                }
                else if (this.isSelected && keys.ctrl) this.isSelected = false;
            }
            else if (!keys.ctrl) this.isSelected = false;
        }
    }
    setMarkers() {
        if (Selector.hasRightClicked && this.isSelected) {
            if (keys.shift && !keys.alt) this.markerPositionList.push([Selector.markerPosition[0], Selector.markerPosition[1]]);
            else {
                this.markerPositionList = [];
                this.markerPositionList[0] = [Selector.markerPosition[0], Selector.markerPosition[1]];
            }
            if (keys.alt) this.markerMove = false;
            else this.markerMove = true;
        }
    }
    calculateMarkers() {
        for (var i = 0; i < this.markerPositionList.length; i++) {
            this.markerVectorList[i] = [this.markerPositionList[i][0] - this.position[0], this.markerPositionList[i][1] - this.position[1]];
            this.markerDistanceList[i] = (this.markerVectorList[i][0] ** 2 + this.markerVectorList[i][1] ** 2) ** (1/2);
            this.markerDirectionList[i] = [this.markerVectorList[i][0] / this.markerDistanceList[0], this.markerVectorList[i][1] / this.markerDistanceList[0]];
        }
        if (!this.markerDistanceList[0] > 0) this.markerPositionList.shift();
    }
    rotate() {
        if (this.markerDistanceList[0] > 0) {
            // Clamping the speed between 0 to 1
            let speed = Math.max(0, Math.min(1, this.turnSpeed));

            // Calculate angle in radians
            let angle = Math.atan2(this.markerDirectionList[0][1], this.markerDirectionList[0][0]) - Math.atan2(this.direction[1], this.direction[0]);

            // Make sure angle stays between -π and π
            while (angle < -Math.PI) angle += 2 * Math.PI;
            while (angle > Math.PI) angle -= 2 * Math.PI;

            // Determine rotation direction
            let rotationDirection = (angle < 0) ? -1 : 1;

            // If difference is smaller than the speed, we've reached the goal
            if (Math.abs(angle) <= speed) {
                this.direction[0] = this.markerDirectionList[0][0];
                this.direction[1] = this.markerDirectionList[0][1];
                this.rotating = false;
            }
            else {
                if (Math.abs(angle) >= Math.PI / 2) this.rotating = true;
                // Calculate new x and y using rotation formula
                const newX = this.direction[0] * Math.cos(speed * deltaTime * rotationDirection) - this.direction[1] * Math.sin(speed * deltaTime * rotationDirection);
                const newY = this.direction[1] * Math.cos(speed * deltaTime * rotationDirection) + this.direction[0] * Math.sin(speed * deltaTime * rotationDirection);

                this.direction[0] = newX;
                this.direction[1] = newY;
            }

            // Normalizing the vector
            let length = Math.sqrt(this.direction[0] * this.direction[0] + this.direction[1] * this.direction[1]);
            this.direction[0] /= length;
            this.direction[1] /= length;
        }
    }
    move() {
        if (this.markerMove && !this.rotating) {
            if (this.markerDistanceList[0] > 0) {
                        if (this.markerDistanceList[0] < this.speed) {
                            this.position[0] = this.markerPositionList[0][0];
                            this.position[1] = this.markerPositionList[0][1];
                        }
                        else {
                            this.position[0] += this.direction[0] * this.speed * deltaTime;
                            this.position[1] += this.direction[1] * this.speed * deltaTime;
                        }
            }
        }
    }
    drawSelectionRing() {
        if (this.isSelected) {
            ctx.strokeStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(this.position[0], this.position[1], this.selectionSize, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }
    drawMarker() {
        if (this.isSelected && this.markerMove) {
            // Circle
            ctx.strokeStyle = "#00ff10";
            ctx.beginPath();
            if (this.markerPositionList.length > 0) {
            ctx.arc(this.markerPositionList[this.markerPositionList.length - 1][0], 
                this.markerPositionList[this.markerPositionList.length - 1][1], this.selectionSize, 0, 2 * Math.PI);
            }
            // Lines
            if (this.markerPositionList.length > 0) {
                // multiple markers
                if (this.markerPositionList.length > 1) {
                    var localMarkerVector = [this.markerPositionList[1][0] - this.markerPositionList[0][0], 
                        this.markerPositionList[1][1] - this.markerPositionList[0][1]];
                    var localMarkerDistance = (localMarkerVector[0] ** 2 + localMarkerVector[1] ** 2) ** (1/2);
                    var localMarkerUnitVector = [localMarkerVector[0] / localMarkerDistance, localMarkerVector[1] / localMarkerDistance];
                    // first marker
                    ctx.moveTo(this.position[0] + this.markerDirectionList[0][0] * this.selectionSize * 2, this.position[1] + this.markerDirectionList[0][1] * this.selectionSize * 2);
                    if (this.markerDistanceList[0] > this.selectionSize * 2) {
                        ctx.lineTo(this.markerPositionList[0][0], this.markerPositionList[0][1]);
                    }
                    else ctx.moveTo(this.markerPositionList[0][0] + localMarkerUnitVector[0] * this.selectionSize * 2, 
                        this.markerPositionList[0][1] + localMarkerUnitVector[1] * this.selectionSize * 2);
                    // other markers
                    for (var i = 1; i < this.markerPositionList.length; i++) {
                        if (i < this.markerPositionList.length - 1) {
                            ctx.lineTo(this.markerPositionList[i][0], this.markerPositionList[i][1]);
                        }
                        else {
                            var localMarkerVector = [this.markerPositionList[i][0] - this.markerPositionList[i - 1][0], 
                                this.markerPositionList[i][1] - this.markerPositionList[i - 1][1]]
                            var localMarkerDistance = (localMarkerVector[0] ** 2 + localMarkerVector[1] ** 2) ** (1/2)
                            var localMarkerUnitVector = [localMarkerVector[0] / localMarkerDistance, localMarkerVector[1] / localMarkerDistance]
                            ctx.lineTo(this.markerPositionList[i][0] - localMarkerUnitVector[0] * this.selectionSize, 
                                this.markerPositionList[i][1] - localMarkerUnitVector[1] * this.selectionSize);
                        }
                    }
                }
                // single marker
                else {
                    ctx.moveTo(this.position[0] + this.markerDirectionList[0][0] * this.selectionSize * 2, 
                    this.position[1] + this.markerDirectionList[0][1] * this.selectionSize * 2);
                    if (this.markerDistanceList[0] > this.selectionSize * 3) {
                        ctx.lineTo(this.markerPositionList[0][0] - this.markerDirectionList[0][0] * this.selectionSize, 
                        this.markerPositionList[0][1] - this.markerDirectionList[0][1] * this.selectionSize);
                    }
                }
            }
            ctx.stroke();
        }
    }
    checkCollision(object){
        // If the object is another unit (circle)
        if(object instanceof Unit){
            let dx = this.position[0] - object.position[0];
            let dy = this.position[1] - object.position[1];
            let distance = Math.sqrt(dx * dx + dy * dy);
    
            // Check if the distance is less than the sum of the two radii (i.e., the selectionSizes)
            if (distance < this.selectionSize + object.selectionSize) {
                return true;
            }
        }
        // If the object is a hill (rectangle)
        else if(object instanceof Hill){
            let dx = Math.abs(this.position[0] - object.position[0] - object.size[0]/2);
            let dy = Math.abs(this.position[1] - object.position[1] - object.size[1]/2);
    
            if (dx > (object.size[0]/2 + this.selectionSize)) { return false; }
            if (dy > (object.size[1]/2 + this.selectionSize)) { return false; }
    
            if (dx <= (object.size[0]/2)) { return true; } 
            if (dy <= (object.size[1]/2)) { return true; }
    
            let cornerDistance_sq = Math.pow((dx - object.size[0]/2), 2) +
                                     Math.pow((dy - object.size[1]/2), 2);
    
            return (cornerDistance_sq <= Math.pow(this.selectionSize, 2));
        }
        return false;
    }
}