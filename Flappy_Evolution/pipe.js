class Pipe {

    constructor(x, y) {
        this.y = y;
        this.x = x;
        this.spacing = 100;
        this.width = 25;
        this.highlight = false;
        this.hit = false;
        this.red = randomGaussian(255 / 2 + 50, 77);
        this.green = randomGaussian(255 / 2 + 50, 77);
        this.blue = randomGaussian(255 / 2 + 50, 77);
    }

    show() {
        if (this.hit) fill(255, 0, 0);
        else if (this.highlight) fill(this.red, this.green, this.blue);
        else fill(this.red, this.green, this.blue, 150);
        rect(this.x, this.y, this.width, height - this.y);
        rect(this.x, 0, this.width, this.y - this.spacing);
    }

    checkCollision(bird) {
        if (bird.y + bird.r > this.y || bird.y - bird.r < this.y - this.spacing) {
            if ((bird.x + bird.r > this.x && bird.x - bird.r < this.x + this.width)) {
                this.hit = true;
                return true;
            }
        }
        if (!this.hit) this.hit = false;
        return false;
    }
}