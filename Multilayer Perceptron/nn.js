class Neural_Network {
    // constructor(numI, numH, layout, numO) {
    //     this.input_nodes = numI;
    //     this.hidden_layers = [];
    //     if (numH < 1 || numH !== layout.length) {
    //         console.log("ERROR");
    //         return undefined;
    //     }
    //     this.weights_ih = [
    //         math.random([layout[0], this.input_nodes], -1, 1),
    //         math.random([layout[0], 1], -1, 1)
    //     ];
    //     for (let i = 1; i < numH; i++) {
    //         this.hidden_layers.push([
    //             math.random([layout[i], layout[i - 1]], -1, 1),
    //             math.random([layout[i], 1], -1, 1)
    //         ]);
    //     }
    //     this.output_layer = numO;
    //     this.hidden_layers.push([
    //         math.random([this.output_layer, layout[layout.length - 1]], -1, 1),
    //         math.random([this.output_layer, 1], -1, 1)
    //     ]);
    //     this.learning_rate = 0.05;
    // }
    constructor(layout) {
        if (layout.length < 3) console.error("Not enough layers");
        this.layout = layout;
        this.network = [];
        for (let i = 1; i < layout.length; i++) {
            this.network.push(this.generateRandom(layout[i], layout[i - 1]));
        }
        this.learning_rate = 0.05;
    }
    generateRandom(rows, cols) {
        return [
            math.random([rows, cols], -1, 1),
            math.random([rows, 1], -1, 1)
        ];
    }
    feedforward(inputs) {
        inputs = math.matrix(inputs);
        let output = inputs;
        for (let i = 0; i < this.layout.length - 1; i++) {
            output = math.multiply(this.network[i][0], output);
            output = math.add(output, this.network[i][1]).map(this.SIGMOID);
        }
        return output.toArray();
    }
    // feedforward(input) {
    //     input = math.matrix(input);
    //     let output = math.multiply(this.weights_ih[0], input);
    //     output = math.add(output, this.weights_ih[1]).map(this.SIGMOID);

    //     for (let i = 0; i < this.hidden_layers.length; i++) {
    //         output = math.multiply(this.hidden_layers[i][0], output);
    //         output = math.add(output, this.hidden_layers[i][1]).map(this.SIGMOID);
    //     }
    //     return output.toArray();
    // }
    train(inputs, target) {
        inputs = math.matrix(inputs);
        target = math.matrix(target);
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
    // train(inputs, target) {
    //     inputs = math.matrix(inputs);
    //     target = math.matrix(target);
    //     let answers = [];
    //     let output = math.multiply(this.weights_ih[0], inputs);
    //     output = math.add(output, this.weights_ih[1]).map(this.SIGMOID);

    //     answers.push(output);

    //     for (let i = 0; i < this.hidden_layers.length; i++) {
    //         output = math.multiply(this.hidden_layers[i][0], output);
    //         output = math.add(output, this.hidden_layers[i][1]).map(this.SIGMOID);
    //         answers.push(output);
    //     }
    //     // console.log(answers);

    //     // calculate the initial error
    //     // target - output
    //     let errors = math.subtract(target, answers[answers.length - 1]);
    //     // console.log(errors.toArray().toString());
    //     // derivative of the activation function
    //     let gradient = answers[answers.length - 1].map(this.dSIGMOID);
    //     // hadamard product with the errors
    //     gradient = math.dotMultiply(gradient, errors);
    //     // multiply by learning rate
    //     gradient = math.multiply(gradient, this.learning_rate);
    //     // calculate delta
    //     let delta = math.multiply(gradient, math.transpose(answers[answers.length - 2]));
    //     this.hidden_layers[this.hidden_layers.length - 1][0] = math.add(this.hidden_layers[this.hidden_layers.length - 1][0], delta);
    //     this.hidden_layers[this.hidden_layers.length - 1][1] = math.add(this.hidden_layers[this.hidden_layers.length - 1][1], gradient);

    //     // if there were more hidden layers
    //     let next_errors = errors;
    //     for (let i = 0; i < this.hidden_layers.length - 1; i++) {
    //         next_errors = math.multiply(math.transpose(this.hidden_layers[this.hidden_layers.length - i - 1][0]), next_errors);
    //         gradient = answers[answers.length - i - 2].map(this.dSIGMOID);
    //         gradient = math.dotMultiply(gradient, next_errors);
    //         gradient = math.multiply(gradient, this.learning_rate);
    //         delta = math.multiply(gradient, math.transpose(answers[answers.length - i - 3]));
    //         this.hidden_layers[this.hidden_layers.length - i - 2][0] = math.add(this.hidden_layers[this.hidden_layers.length - i - 2][0], delta);
    //         this.hidden_layers[this.hidden_layers.length - i - 2][1] = math.add(this.hidden_layers[this.hidden_layers.length - i - 2][1], gradient);
    //     }
    //     next_errors = math.multiply(math.transpose(this.hidden_layers[0][0]), next_errors);
    //     gradient = answers[0].map(this.dSIGMOID);
    //     gradient = math.dotMultiply(gradient, next_errors);
    //     gradient = math.multiply(gradient, this.learning_rate);
    //     delta = math.multiply(gradient, math.transpose(inputs));
    //     this.weights_ih[0] = math.add(this.weights_ih[0], delta);
    //     this.weights_ih[1] = math.add(this.weights_ih[1], gradient);
    // }

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