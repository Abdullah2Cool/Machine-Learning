class dot {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.status = 0;
    }
    show() {
        if (this.status === 1) {
            stroke(255);
        } else if (this.status === -1) {
            stroke(255, 0, 0);
        } else {
            stroke(255, 0, 255);
        }
        ellipse(map(this.pos.x, -1, 1, 0, width), map(this.pos.y, -1, 1, height, 0), 4, 4);
    }
}