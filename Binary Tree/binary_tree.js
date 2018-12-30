var t;
var spacing = 50;
function setup() {
    createCanvas(1000, 600);
    t = new Tree();
    for (let i = 0; i < 40; i++) {
        t.addNode(floor(random(-i, i)));
    }
    console.log(t);
    t.print_sorted();
    console.log(t.search(0));
    textAlign(CENTER, CENTER);
}

function draw() {
    background(51);
    t.show();
}

class Tree {
    constructor() {
        this.root = null;
    }
    addNode(n) {
        let node = new Node(n, 0, 0);
        if (this.root === null) {
            this.root = node;
            node.x = width / 2;
            node.y = spacing;
            return;
        }
        this.root.add_child(node);
    }
    print_sorted() {
        if (this.root !== null) this.root.visit();
    }
    search(val) {
        if (this.root === null) return false;
        return this.root.search(val);
    }
    show() {
        if (this.root !== null) this.root.show();
    }
}



class Node {
    constructor(val, x, y) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.x = x;
        this.y = y;
    }
    add_child(n) {
        if (n.val < this.val) {
            if (this.left === null) {
                this.left = n;
                this.left.x = this.x - spacing;
                this.left.y = this.y + spacing;
            } else {
                this.left.add_child(n);
            }
        } else if (n.val > this.val) {
            if (this.right === null) {
                this.right = n;
                this.right.x = this.x + spacing;
                this.right.y = this.y + spacing;
            } else {
                this.right.add_child(n);
            }
        }
    }
    visit() {
        if (this.left !== null) this.left.visit();
        console.log(this.val);
        if (this.right !== null) this.right.visit();
    }
    search(val) {
        if (this.val === val) return this;
        if (this.left !== null && val < this.val) return this.left.search(val);
        if (this.right !== null && val > this.val) return this.right.search(val);
        return false;
    }
    show() {
        fill(255);
        noStroke();
        text(this.val, this.x, this.y);
        stroke(255);
        noFill();
        ellipse(this.x, this.y, spacing, spacing);
        if (this.left !== null) {
            line(this.x, this.y, this.left.x, this.left.y);
            this.left.show();
        }
        if (this.right !== null) {
            line(this.x, this.y, this.right.x, this.right.y);
            this.right.show();
        }
    }
}
