class Soldier extends Unit {
    constructor(position, direction) {
        super(position, direction);
        this.color = "#454B1B";
        this.speed = 1.5;
        this.turnSpeed = Math.PI / 10;
        this.selectionSize = 17;
        this.size = 10;
        this.gunSize = 15;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position[0], this.position[1], this.size, 0, 2 * Math.PI);

        ctx.fill();

        // gun?
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(
            this.position[0] + 2 * Math.cos(Math.atan2(this.direction[1], this.direction[0]) + Math.PI / 2), 
            this.position[1] + 2 * Math.sin(Math.atan2(this.direction[1], this.direction[0]) + Math.PI / 2)
        );
        ctx.lineTo(
            this.position[0] + 2 * Math.cos(Math.atan2(this.direction[1], this.direction[0]) + Math.PI / 2) + this.direction[0] * this.gunSize, 
            this.position[1] + 2 * Math.sin(Math.atan2(this.direction[1], this.direction[0]) + Math.PI / 2) + this.direction[1] * this.gunSize
        );
        ctx.stroke();
    }
}

class Tank extends Unit {
    constructor(position, direction) {
        super(position, direction);
        this.color = "#653321";
        this.speed = 2;
        this.turnSpeed = Math.PI / 30;
        this.selectionSize = 20;
        this.size = 15;
        this.gunSize = 17;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        // square :'(
        ctx.moveTo(this.position[0] + (this.direction[0] * Math.cos(Math.PI * 1 / 4) + this.direction[1] * Math.sin(Math.PI * 1 / 4)) * this.size,
        this.position[1] + (-this.direction[0] * Math.sin(Math.PI * 1 / 4) + this.direction[1] * Math.cos(Math.PI * 1 / 4)) * this.size);
        ctx.lineTo(this.position[0] + (this.direction[0] * Math.cos(Math.PI * 3 / 4) + this.direction[1] * Math.sin(Math.PI * 3 / 4)) * this.size,
        this.position[1] + (-this.direction[0] * Math.sin(Math.PI * 3 / 4) + this.direction[1] * Math.cos(Math.PI * 3 / 4)) * this.size);
        ctx.lineTo(this.position[0] + (this.direction[0] * Math.cos(Math.PI * 5 / 4) + this.direction[1] * Math.sin(Math.PI * 5 / 4)) * this.size,
        this.position[1] + (-this.direction[0] * Math.sin(Math.PI * 5 / 4) + this.direction[1] * Math.cos(Math.PI * 5 / 4)) * this.size);
        ctx.lineTo(this.position[0] + (this.direction[0] * Math.cos(Math.PI * 7 / 4) + this.direction[1] * Math.sin(Math.PI * 7 / 4)) * this.size,
        this.position[1] + (-this.direction[0] * Math.sin(Math.PI * 7 / 4) + this.direction[1] * Math.cos(Math.PI * 7 / 4)) * this.size);        
        ctx.lineTo(this.position[0] + (this.direction[0] * Math.cos(Math.PI * 1 / 4) + this.direction[1] * Math.sin(Math.PI * 1 / 4)) * this.size,
        this.position[1] + (-this.direction[0] * Math.sin(Math.PI * 1 / 4) + this.direction[1] * Math.cos(Math.PI * 1 / 4)) * this.size);
        ctx.fill();

        // gun?
        ctx.strokeStyle = "#aaaaaa";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.position[0], this.position[1]);
        ctx.lineTo(this.position[0] + this.direction[0] * this.gunSize,this.position[1] + this.direction[1] * this.gunSize);
        ctx.stroke();
        ctx.lineWidth = 1;
    }
}
var units = [
    new Soldier([100,50], [1, 0]),
    new Soldier([100,100], [1, 0]),
    new Soldier([100,150], [1, 0]),
    new Tank([100,200], [1, 0]),
    new Tank([100,250], [1, 0]),
];