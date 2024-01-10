class Hill {
    constructor(position, size, color) {
        this.position = position;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.position[0], this.position[1],this.size[0],this.size[1])
        ctx.fill();
    }
}

var hills = [
    new Hill([700,50], [50, 500], "#444444"),
    new Hill([750,500], [200, 50], "#444444"),
];