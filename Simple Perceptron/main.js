let p;
let data;
let m = 2;
let b = 0;
learning_rate = 0.00001;
let slop_slider;
let b_slider;
let learning_rate_slider;
let button;
function setup() {
    createCanvas(900, 500);
    data = [];
    p = new Perceptron(3);
    for (let i = 0; i < 2000; i++) {
        add_point(random(width), random(height));
    }
    slop_slider = createSlider(0, 100, random(-1, 1), 0.001);
    b_slider = createSlider(-1, 1, 0, 0.001);
    learning_rate_slider = createSlider(0.00001, 1, 0.00001, 0.00001);
    button = createButton("Train");
    button.mousePressed(train);
}

function draw() {
    background(0);
    stroke(255, 0, 255);
    strokeWeight(2);
    draw_line();
    noFill();
    strokeWeight(1);
    for (let i = 0; i < data.length; i++) {
        data[i].show();
    }
    m = slop_slider.value();
    b = b_slider.value();
    learning_rate = learning_rate_slider.value();
    train();
    guess();
}

function train() {
    // train the model
    let input = [], target = 0;
    for (let i = 0; i < max(data.length, 1); i++) {
        input = [data[i].pos.x, data[i].pos.y, 1];
        target = getLabel(input[0], input[1]);
        p.train(input, target, SIGN, learning_rate);
    }
}

function guess() {
    let temp = [];
    for (let i = 0; i < data.length; i++) {
        temp = [data[i].pos.x, data[i].pos.y, 1];
        data[i].status = p.getOutput(temp, SIGN);
    }
}

function SIGN(n) {
    return n < 0 ? -1 : 1;
}

function mousePressed() {
    add_point(mouseX, mouseY);
}

function f(x) {
    return m * x + b;
}

function mapPoint(x, y) {
    x = map(x, 0, width, -1, 1);
    y = map(y, 0, height, 1, -1);
    return [x, y];
}

function add_point(x, y) {
    let t = mapPoint(x, y);
    x = t[0];
    y = t[1];
    let point = new dot(x, y);
    // bias
    t.push(1);
    point.status = p.getOutput(t, SIGN);
    data.push(point);
}

function draw_line() {
    let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    x1 = -1;
    y1 = f(x1);
    x2 = 1;
    y2 = f(x2);
    x1 = map(x1, -1, 1, 0, width);
    y1 = map(y1, -1, 1, height, 0);
    x2 = map(x2, -1, 1, 0, width);
    y2 = map(y2, -1, 1, height, 0);
    line(x1, y1, x2, y2);
}

function getLabel(x, y) {
    return f(x) >= y ? 1 : -1;
}