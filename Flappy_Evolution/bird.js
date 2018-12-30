class Bird {
    constructor(brain) {
        this.x = width / 2 - 200;
        this.y = height / 2;
        this.r = 15;
        this.velocity = 0;
        this.gravity = 1;
        this.lift = -12;
        this.score = 0;
        this.fitness = 0;
        if (brain) this.brain = brain;
        else this.brain = new Neural_Network([5, 8, 2]);
    }

    think(pipe) {
        // birds y,  top of pipe, bottom of pipe, x-pipe, bird's velocity
        let input = math.matrix([[this.y / height], [(pipe.y - pipe.spacing) / height], [pipe.y / height], [pipe.x / width], [this.velocity / 15]]);
        // console.log(input.toArray().toString());
        let output = this.brain.feedforward(input);
        if (output[0] > output[1]) this.jump();
    }

    jump() {
        this.velocity += this.lift;
    }

    show() {
        stroke(random(255), random(255), random(255));
        fill(255, this.score % 100 + 155);
        ellipse(this.x, this.y, this.r, this.r);
        noStroke();
        fill(0);
        text(this.score, this.x, this.y);
    }

    update() {
        this.y += this.velocity;
        this.velocity += this.gravity;
        this.velocity *= 0.9;

    }

    offscreen() {
        if (this.y + this.r > height) {
            return true;
        } else if (this.y - this.r < 0) {
            return true;
        }
        return false;
    }

    mutate(rate) {
        this.brain.mutate(rate);
    }
}