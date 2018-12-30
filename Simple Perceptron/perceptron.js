class Perceptron {
    constructor(num_inputs) {
        this.num_inputs = num_inputs;
        this.weights = [];
        for (let i = 0; i < num_inputs; i++) {
            this.weights.push(random(-1, 1));
        }
    }

    getOutput(input, activation) {
        if (input.length !== this.num_inputs) {
            console.log("ERROR");
            return null;
        } else {
            let sum = 0;
            for (let i = 0; i < this.num_inputs; i++) {
                sum += input[i] * this.weights[i];
            }
            return activation(sum);
        }
    }

    train(input, target, activation, learning_rate) {
        let guess = this.getOutput(input, activation);
        let error = target - guess;
        // console.log(`Input: ${input}, Target: ${target}, Guess: ${guess}, Error: ${error}`);
        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] += error * input[i] * learning_rate;
        }
    }
}