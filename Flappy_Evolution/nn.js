class Neural_Network {
    constructor(data) {
        if (data instanceof Neural_Network) {
            this.layout = data.layout;
            this.network = [];
            for (let i = 0; i < data.layout.length - 1; i++) {
                this.network.push([
                    math.clone(data.network[i][0]),
                    math.clone(data.network[i][1])
                ]);
            }
            this.learning_rate = data.learning_rate;
        } else {
            if (data.length < 3) console.error("Not enough layers");
            this.layout = data;
            this.network = [];
            for (let i = 1; i < data.length; i++) {
                this.network.push(this.generateRandom(data[i], data[i - 1]));
            }
            this.learning_rate = 0.1;
        }
    }
    generateRandom(rows, cols) {
        return [
            math.matrix(math.random([rows, cols], -1, 1)),
            math.matrix(math.random([rows, 1], -1, 1))
        ];
    }
    feedforward(inputs) {
        let output = inputs;
        for (let i = 0; i < this.layout.length - 1; i++) {
            output = math.multiply(this.network[i][0], output);
            output = math.add(output, this.network[i][1]).map(this.SIGMOID);
        }
        return output.toArray();
    }
    train(inputs, target) {
        let answers = [inputs];

        let output = inputs;
        for (let i = 0; i < this.layout.length - 1; i++) {
            output = math.multiply(this.network[i][0], output);
            output = math.add(output, this.network[i][1]).map(this.SIGMOID);
            answers.push(output);
        }
        // console.log(answers);

        let error = math.subtract(target, answers[answers.length - 1]);
        let gradient, delta;
        for (let i = this.layout.length - 1; i >= 1; i--) {
            gradient = answers[i].map(this.dSIGMOID);
            gradient = math.dotMultiply(gradient, error);
            gradient = math.multiply(gradient, this.learning_rate);
            delta = math.multiply(gradient, math.transpose(answers[i - 1]));
            this.network[i - 1][0] = math.add(this.network[i - 1][0], delta);
            this.network[i - 1][1] = math.add(this.network[i - 1][1], gradient);
            error = math.multiply(math.transpose(this.network[i - 1][0]), error);
        }
    }

    SIGMOID(value, index, matrix) {
        return 1 / (1 + Math.exp(-value));
    }
    dSIGMOID(value, index, matrix) {
        return value * (1 - value);
    }
    setLearningRate(n) {
        if (n > 0 && n <= 1) this.learning_rate = n;
    }

    copy() {
        return new Neural_Network(this);
    }
    mutate(rate) {
        for (let i = 0; i < this.network.length; i++) {
            for (let j = 0; j < this.network[i].length; j++) {
                // this.network[i][j] = this.network[i][j].map((val) => {
                //     if (random() < rate) {
                //         val += randomGaussian(0, 0.1);
                //         if (val >= 0) return min(val, 1);
                //         else return max(-1, val);
                //     }
                //     return val;
                // });
                this.network[i][j] = this.network[i][j].map((val) => random() < rate ? random(-1, 1) : val);
            }
        }
    }

    static crossOver(a, b) {
        let child = a.copy();
        for (let i = 0; i < child.network.length; i++) {
            for (let j = 0; j < child.network[i].length; j++) {
                child.network[i][j].forEach((value, index, matrix) => {
                    if (random() < 0.5) matrix.subset(math.index(index[0], index[1]), b.network[i][j].get(index));
                });
            }
        }
        return child;
    }
    static crossOver2(a) {
        return a.copy();
    }


}
