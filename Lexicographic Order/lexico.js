let arr = [];
let next = [];
function setup() {
    createCanvas(600, 600);
    for (let i = 0; i < 8; i++) {
        arr[i] = i;
        next[i] = i;
    }
    textAlign(CENTER, CENTER);
    textSize(32);
    console.log(arr.join(" "));
}
function swap(a, i, j) {
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}
function draw() {
    background(51);
    fill(255);
    text(arr.join(" "), width / 2, height / 2);

    let largestX = -1;
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < arr[i + 1]) {
            largestX = i;
        }
    }
    let largestY = 0;
    if (largestX === -1) {
        console.log("FINISHED");
        noLoop();
    } else {
        // console.log(largestX);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > arr[largestX]) {
                largestY = i;
            }
        }
        // console.log(largestY);
        swap(arr, largestX, largestY);
        let endArr = arr.splice(largestX + 1).reverse();
        arr = arr.concat(endArr);
        // console.log(arr.join(" "));
    }
}