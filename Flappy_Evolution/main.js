const TOTAL = 250;
let birds, savedBirds;
let pipes;
let closestPipe;
let time;
let speedSlider;
let capturer = new CCapture({ format: 'png', framerate: 60 });
function setup() {
    createCanvas(600, 600);
    pipes = [];
    birds = [];
    savedBirds = [];
    for (let i = 0; i < TOTAL; i++) addBird();
    time = 0;
    n = 5;
    smooth();
    ellipseMode(RADIUS);
    textAlign(CENTER, CENTER);
    speedSlider = createSlider(1, 15, 1);
    frameRate(30);
    // capturer.start();
    smooth();
}

function doWork() {
    if (time % 50 === 0) addPipe(width);
    // move the pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
        let p = pipes[i];
        p.x -= 4;
        if (p.x + p.width < 0) removePipe(i);
    }
    closestPipe = pipes[0];
    if (closestPipe.x + closestPipe.width < birds[0].x - birds[0].r) {
        closestPipe.highlight = false;
        closestPipe = pipes[1];
    }
    closestPipe.highlight = true;

    for (let j = birds.length - 1; j >= 0; j--) {
        let bird = birds[j];
        bird.think(closestPipe);
        bird.update();
        if (closestPipe.checkCollision(bird)) {
            savedBirds.push(birds.splice(j, 1)[0]);
        } else if (bird.offscreen()) {
            bird.score = 1;
            savedBirds.push(birds.splice(j, 1)[0]);
        } else {
            if (time % 10 === 0) bird.score++;
        }
    }
    time++;
    if (birds.length === 0) nextGeneration();
}

function draw() {
    for (let l = 0; l < speedSlider.value(); l++) doWork();
    background(0);
    for (let bird of birds) {
        bird.show();
    }

    for (let pipe of pipes) {
        pipe.show();
    }

    // console.log("Capturing frame.");
    // capturer.capture(document.getElementById('defaultCanvas0'));
}



function addPipe(x) {
    pipes.push(new Pipe(x, random(height / 3, height - height / 3)));
    // pipes.push(new Pipe(x, height / 2 - sin(time) * 200));
}

function removePipe(i) {
    pipes.splice(i, 1);
}

function addBird(bird) {
    if (bird) birds.push(bird)
    else birds.push(new Bird());
}

function keyPressed() {
    if (key === ' ') {
        // noLoop();
        // console.log("Finished Recording.");
        // capturer.stop();
        // capturer.save();
        // return;
    }
    if (keyCode === UP_ARROW) {
        birds[0].y--;
    }
    if (keyCode === DOWN_ARROW) {
        birds[0].y++;
    }
    if (keyCode === LEFT_ARROW) {
        birds[0].x -= 4;
    }
    if (keyCode === RIGHT_ARROW) {
        birds[0].x += 4;
    }
}
