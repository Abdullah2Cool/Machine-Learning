class Neural_Network {
    constructor(layout) {
        if (layout.length < 3) console.error("Not enough layers");
        this.layout = layout;
        this.network = [];
        for (let i = 1; i < layout.length; i++) {
            this.network.push(this.generateRandom(layout[i], layout[i - 1]));
        }
        this.learning_rate = 0.1;
    }
    generateRandom(rows, cols) {
        return [
            math.random([rows, cols], -1, 1),
            math.random([rows, 1], -1, 1)
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
}