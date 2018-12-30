/// <reference path="math.min.js"/>
let brain;
let training_data = [
    {
        inputs: [[0], [0]],
        targets: [[0]]
    },
    {
        inputs: [[1], [1]],
        targets: [[0]]
    },
    {
        inputs: [[0], [1]],
        targets: [[1]]
    },
    {
        inputs: [[1], [0]],
        targets: [[1]]
    }
];
let resolution, cols, rows;
let lr_slider, r, g, b;
function setup() {
    createCanvas(500, 500);
    // brain = new Neural_Network(2, 1, [2], 1);
    brain = new Neural_Network([2, 2, 1]);
    console.log(brain);
    resolution = 10;
    rows = width / resolution;
    cols = height / resolution;
    lr_slider = createSlider(0.001, 1, 0.01, 0.001);
    r = random(255) + 100;
    g = random(255) + 100;
    b = random(255) + 100;
    textAlign(CENTER, CENTER);
    noStroke();
    smooth();

    // brain.constructor2([2, 2, 1]);
    // console.log(brain.feedforward2(training_data[0].inputs));
    // brain.train2(training_data[0].inputs, training_data[0].targets);
}

function draw() {
    background(0);
    for (let i = 0; i < 1000; i++) {
        let data = random(training_data);
        brain.train(data.inputs, data.targets);
    }

    for (let y = 0; y < cols; y++) {
        for (let x = 0; x < rows; x++) {
            let input = [[x / rows], [y / cols]];
            let ans = brain.feedforward(input)[0][0];
            fill(ans * r, ans * g, ans * b);
            rect(x * resolution, y * resolution, resolution, resolution);
        }
    }
    fill(255);
    text(frameRate(), width / 2, height / 2);
    brain.setLearningRate(lr_slider.value());
}