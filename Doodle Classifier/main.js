let moon_data, hand_data, donut_data;
const imgDim = 28;
const imgSize = 784;
const total_data = 1000;
const MOON = 0, HAND = 1, DONUT = 2;
let moon = {}, hand = {}, donut = {};
let TRAINING, TESTING;
let nn;
function preload() {
    moon_data = loadBytes("data/moon10000.bin");
    hand_data = loadBytes("data/hand10000.bin");
    donut_data = loadBytes("data/donut10000.bin");
}


function prepareData(category, data, label) {
    let offset = 0;
    let threshold = floor(0.9 * total_data);
    category.training = [];
    category.testing = [];
    for (let i = 0; i < total_data; i++) {
        offset = i * imgSize;
        if (i < threshold) {
            category.training[i] = Array.from(data.bytes.subarray(offset, offset + imgSize)).map(x => x / 255.0);
            category.training[i].label = label;
        } else {
            category.testing[i - threshold] = Array.from(data.bytes.subarray(offset, offset + imgSize)).map(x => x / 255.0);
            category.testing[i - threshold].label = label;
        }
    }
}

function trainEpoch() {
    // train for one epoch
    console.log("TRAINING...");
    shuffle(TRAINING, true);
    let inputs, label, target, data;
    for (let i = 0; i < TRAINING.length; i++) {
        console.log(`${floor((i + 1) / TRAINING.length * 100)}%`);
        data = TRAINING[i];
        inputs = math.matrix(data).resize([imgSize, 1]);
        label = TRAINING[i].label;
        target = [0, 0, 0];
        target[label] = 1;
        target = math.matrix(target).resize([3, 1]);
        nn.train(inputs, target);
    }

    console.log("Trained for one epoch");
    testAll();
}

function testAll() {
    console.log("TESTING...");
    let inputs, label, data;
    let correct = 0;
    for (let i = 0; i < TESTING.length; i++) {
        console.log(`${floor((i + 1) / TESTING.length * 100)}%`);
        data = TESTING[i];
        inputs = math.matrix(data).resize([imgSize, 1]);
        label = TESTING[i].label;
        correct += getVerdict(inputs, label);
    }

    console.log(`Correctness: ${correct / TESTING.length * 100}%`);
}

function getVerdict(inputs, label) {
    let guess = nn.feedforward(inputs);
    classification = 0;
    for (let j = 1; j < guess.length; j++) {
        if (guess[classification] < guess[j]) classification = j;
    }
    if (classification === label) return 1;
    return 0;
}

function setup() {
    let v = createCanvas(420, 420);
    v.parent('sketch');
    background(255);

    // prepare data
    prepareData(moon, moon_data, MOON);
    prepareData(hand, hand_data, HAND);
    prepareData(donut, donut_data, DONUT);

    // create neural network
    nn = new Neural_Network([imgSize, 64, 28, 3]);

    // create training data
    TRAINING = [];
    TRAINING = TRAINING.concat(moon.training).concat(hand.training).concat(donut.training);
    TESTING = [];
    TESTING = TESTING.concat(moon.testing).concat(hand.testing).concat(donut.testing);

    let trainButton = select('#train');
    trainButton.mousePressed(() => {
        trainEpoch();
    });
    let testButton = select("#test");
    testButton.mousePressed(() => {
        testAll();
    });
    let guessButton = select("#guess");
    guessButton.mousePressed(() => {
        let input = [];
        let img = get();
        img.resize(imgDim, imgDim);
        img.loadPixels();
        for (let i = 0; i < imgSize; i++) {
            let bright = img.pixels[i * 4];
            input[i] = (255 - bright) / 255.0;
        }
        img.updatePixels();
        input = math.matrix(input).resize([imgSize, 1]);
        let guess = nn.feedforward(input);
        classification = 0;
        for (let j = 1; j < guess.length; j++) {
            if (guess[classification] < guess[j]) classification = j;
        }
        if (classification === MOON) console.log("THIS IS A MOON");
        if (classification === HAND) console.log("THIS IS A HAND");
        if (classification === DONUT) console.log("THIS IS A DONUT");
    });

    let clearButton = select("#clear");
    clearButton.mousePressed(() => background(255));
    textAlign(CENTER, CENTER);
}

function draw() {
    strokeWeight(30);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    // if (frameCount % 100 === 0) console.log(`Frame Rate: ${frameRate()}`);
}