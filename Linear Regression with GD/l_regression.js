let data = [];
let m = 0;
let b = 0;
let learning_rate = 0.05;
function setup() {
    createCanvas(400, 400);
    // for (let i = 0; i < 30; i++) {
    //     add_point(i * 10, height - i * 10);
    // }
}

function draw() {
    background(51);
    gradient_descent();
    stroke(255, 0, 0);
    strokeWeight(5);
    for (let i = 0; i < data.length; i++) {
        point(map(data[i].x, 0, 1, 0, width), map(data[i].y, 0, 1, height, 0));
    }
    stroke(255, 0, 255);
    strokeWeight(2);
    draw_line();
}

function mousePressed() {
    add_point(mouseX, mouseY);
}

function add_point(x, y) {
    x = map(x, 0, width, 0, 1);
    y = map(y, 0, height, 1, 0);
    let point = createVector(x, y);
    data.push(point);
}

function draw_line() {
    let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    x1 = 0;
    y1 = m * x1 + b;
    x2 = 1;
    y2 = m * x2 + b;
    x1 = map(x1, 0, 1, 0, width);
    y1 = map(y1, 0, 1, height, 0);
    x2 = map(x2, 0, 1, 0, width);
    y2 = map(y2, 0, 1, height, 0);
    line(x1, y1, x2, y2);
}

function gradient_descent() {
    if (data.length === 0) return;
    let x, y, guess, error;
    for (let i = 0; i < data.length; i++) {
        x = data[i].x;
        y = data[i].y;
        guess = m * x + b;
        error = y - guess;
        m += error * x * learning_rate;
        b += error * learning_rate;
    }
}