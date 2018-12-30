let x_values = [];
let y_values = [];
let isDrawing = false;

let a, b, c, d;
const learningRate = 0.2;
const optimizer = tf.train.adam(learningRate);
let x, y;
function setup() {
    createCanvas(500, 500);
    a = tf.variable(tf.scalar(random(-1, 1)));
    b = tf.variable(tf.scalar(random(-1, 1)));
    c = tf.variable(tf.scalar(random(-1, 1)));
    d = tf.variable(tf.scalar(random(-1, 1)));
    smooth();
    // for (let i = 0; i < 1; i += 0.05) {
    //     addPoint([i, i * i]);
    //     addPoint([-i, i * i]);
    // }
}

function draw() {
    background(0);
    stroke(255);
    strokeWeight(8);
    for (let i = 0; i < x_values.length; i++) {
        let coordinates = unmapPoint(x_values[i], y_values[i]);
        x = coordinates[0];
        y = coordinates[1];
        point(x, y);
    }
    if (x_values.length > 0 && isDrawing === false) tf.tidy(() => optimizer.minimize(() => loss(predict(x_values), tf.tensor1d(y_values))));

    strokeWeight(2);
    //draw the curve
    const curveX = [];
    for (let i = -1; i < 1.01; i += 0.01) {
        curveX.push(i);
    }
    noFill();
    beginShape();
    const ys = tf.tidy(() => predict(curveX).dataSync());
    for (let i = 0; i < curveX.length; i++) {
        x = map(curveX[i], -1, 1, 0, width);
        y = map(ys[i], -1, 1, height, 0);
        vertex(x, y);
    }
    endShape();

    if (frameCount % 200 === 0) console.log(tf.memory().numTensors);
}

function loss(pred, labels) {
    return pred.sub(labels).square().mean();
}

function predict(x) {
    const xs = tf.tensor1d(x);
    // y = ax^3 + bx^2 + cx + d
    const ys = xs.pow(3).mul(a).add(xs.square().mul(b)).add(xs.mul(c)).add(d);
    return ys;
}

function mapPoint(x, y) {
    x = map(x, 0, width, -1, 1);
    y = map(y, 0, height, -1, 1);
    return [x, y];
}

function unmapPoint(x, y) {
    x = map(x, -1, 1, 0, width);
    y = map(y, -1, 1, height, 0);
    return [x, y];
}

function addPoint(point) {
    x_values.push(point[0]);
    y_values.push(point[1]);
}



function mouseDragged() {
    if (frameCount % 4 === 0) {
        addPoint(mapPoint(mouseX, height - mouseY));
    }
}
function mousePressed() {
    isDrawing = true;
}

function mouseReleased() {
    isDrawing = false;
}